/**
 * Input sanitization and validation for high-volume contact API.
 */

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: {
    name: string;
    email: string;
    message: string;
  };
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateAndSanitizeContact(
  data: unknown
): ValidationResult {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request payload." };
  }

  const payload = data as Record<string, unknown>;

  // Honeypot check: Bots auto-fill hidden inputs
  if (payload.honeypot && typeof payload.honeypot === "string" && payload.honeypot.trim() !== "") {
    // Silently reject spam bots
    return { valid: false, error: "Spam bot submission detected." };
  }

  const rawName = typeof payload.name === "string" ? payload.name.trim() : "";
  const rawEmail = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const rawMessage = typeof payload.message === "string" ? payload.message.trim() : "";

  // Validate Name
  if (!rawName || rawName.length < 2) {
    return { valid: false, error: "Name must be at least 2 characters long." };
  }
  if (rawName.length > 80) {
    return { valid: false, error: "Name cannot exceed 80 characters." };
  }

  // Validate Email
  if (!rawEmail || !EMAIL_REGEX.test(rawEmail) || rawEmail.length > 120) {
    return { valid: false, error: "Please provide a valid email address." };
  }

  // Validate Message
  if (!rawMessage || rawMessage.length < 5) {
    return { valid: false, error: "Message must be at least 5 characters long." };
  }
  if (rawMessage.length > 3000) {
    return { valid: false, error: "Message cannot exceed 3,000 characters." };
  }

  // Basic HTML/script stripping for safety in notifications
  const cleanName = stripTags(rawName);
  const cleanMessage = stripTags(rawMessage);

  return {
    valid: true,
    sanitized: {
      name: cleanName,
      email: rawEmail,
      message: cleanMessage,
    },
  };
}

function stripTags(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
