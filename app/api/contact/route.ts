import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "@/lib/rateLimit";
import { validateAndSanitizeContact } from "@/lib/validation";
import { processContactMessage } from "@/lib/contactService";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Resolve client IP for rate limiting & abuse prevention
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || "127.0.0.1";

    // 2. Heavy usage protection: Rate Limit (5 requests per 10 minutes per IP)
    const rateCheck = rateLimiter.check(clientIp, 5, 10 * 60 * 1000);

    if (!rateCheck.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions from your connection. Please wait ${rateCheck.resetInSeconds} seconds before sending another message, or reach out directly via email or LinkedIn below.`,
          guidance: {
            directEmail: "singhdiwija@gmail.com",
            linkedInUrl: "https://www.linkedin.com/in/yashvardhan-singh-3a3183394/",
            mailtoUrl: "mailto:singhdiwija@gmail.com?subject=Direct%20Inquiry",
          },
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateCheck.resetInSeconds.toString(),
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 3. Parse JSON request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON format." },
        { status: 400 }
      );
    }

    // 4. Input validation, honeypot spam detection, and sanitization
    const validation = validateAndSanitizeContact(body);
    if (!validation.valid || !validation.sanitized) {
      return NextResponse.json(
        { success: false, error: validation.error || "Invalid form submission." },
        { status: 400 }
      );
    }

    // 5. Process and record message + construct guidance package
    const { recordId, guidance } = await processContactMessage(
      validation.sanitized,
      clientIp
    );

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully!",
        recordId,
        guidance,
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": rateCheck.remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Unhandled error in /api/contact:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your message. Please reach out directly to singhdiwija@gmail.com.",
      },
      { status: 500 }
    );
  }
}

// Health check and public guidance endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Yashvardhan Portfolio Contact API",
    recipient: "Yashvardhan Raj Singh",
    email: "singhdiwija@gmail.com",
    linkedIn: "https://www.linkedin.com/in/yashvardhan-singh-3a3183394/",
    github: "https://github.com/Yashvardhan-codee",
    rateLimits: "5 requests per 10 minutes per IP",
  });
}
