import { promises as fs } from "fs";
import path from "path";

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
  ip: string;
}

export interface ContactGuidance {
  recipientName: string;
  directEmail: string;
  mailtoUrl: string;
  linkedInUrl: string;
  gitHubUrl: string;
  responseExpectation: string;
  tips: string[];
}

const MESSAGES_FILE = path.join(process.cwd(), "data", "messages.json");

export async function processContactMessage(
  data: { name: string; email: string; message: string },
  ip: string
): Promise<{ recordId: string; guidance: ContactGuidance }> {
  const recordId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const record: ContactMessageRecord = {
    id: recordId,
    name: data.name,
    email: data.email,
    message: data.message,
    receivedAt: new Date().toISOString(),
    ip,
  };

  // 1. Asynchronously persist message (failsafe logging)
  try {
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });

    let existing: ContactMessageRecord[] = [];
    try {
      const fileData = await fs.readFile(MESSAGES_FILE, "utf-8");
      existing = JSON.parse(fileData);
    } catch {
      existing = [];
    }

    existing.unshift(record);
    // Keep last 1,000 messages in file storage to prevent unbounded growth
    if (existing.length > 1000) {
      existing = existing.slice(0, 1000);
    }

    await fs.writeFile(MESSAGES_FILE, JSON.stringify(existing, null, 2), "utf-8");
  } catch (err) {
    console.error("Non-blocking message persistence error:", err);
  }

  // 2. Email Dispatch Hook (e.g. Resend / SMTP if configured in environment)
  await dispatchEmailNotification(record);

  // 3. Return rich guidance for the contact
  const prefilledSubject = encodeURIComponent(`Portfolio Inquiry from ${data.name}`);
  const prefilledBody = encodeURIComponent(
    `Hi Yashvardhan,\n\nI just submitted your portfolio contact form. Reaching out regarding: ${data.message.slice(0, 150)}...\n\nBest regards,\n${data.name}`
  );
  const mailtoUrl = `mailto:singhdiwija@gmail.com?subject=${prefilledSubject}&body=${prefilledBody}`;

  const guidance: ContactGuidance = {
    recipientName: "Yashvardhan Raj Singh",
    directEmail: "singhdiwija@gmail.com",
    mailtoUrl,
    linkedInUrl: "https://www.linkedin.com/in/yashvardhan-singh-3a3183394/",
    gitHubUrl: "https://github.com/Yashvardhan-codee",
    responseExpectation: "Usually replies within 12 - 24 hours.",
    tips: [
      "For urgent opportunities or direct discussions, connecting on LinkedIn is recommended.",
      "You can also send documents or resumes directly using the one-click email button.",
      "A copy of your submission is securely logged.",
    ],
  };

  return { recordId, guidance };
}

/**
 * Dispatches email via external provider (Resend / SMTP) if API keys are configured,
 * otherwise outputs structured logs in development/preview environments.
 */
async function dispatchEmailNotification(record: ContactMessageRecord): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      // Direct fetch to Resend API - lightweight, zero additional packages required
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["singhdiwija@gmail.com"],
          reply_to: record.email,
          subject: `Portfolio Message from ${record.name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
              <h2 style="color: #4f46e5;">New Portfolio Contact Message</h2>
              <p><strong>From:</strong> ${record.name} (&lt;${record.email}&gt;)</p>
              <p><strong>Received:</strong> ${record.receivedAt}</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
              <p><strong>Message:</strong></p>
              <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="white-space: pre-wrap; margin: 0;">${record.message}</p>
              </div>
            </div>
          `,
        }),
      });
    } catch (error) {
      console.error("Resend delivery failed:", error);
    }
  } else {
    // Development / self-hosted logger
    console.log("[Contact Backend] New message received:", {
      id: record.id,
      from: `${record.name} <${record.email}>`,
      snippet: record.message.substring(0, 80),
    });
  }
}
