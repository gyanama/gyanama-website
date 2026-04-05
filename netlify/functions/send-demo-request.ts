import type { Context } from "@netlify/functions";

// Server-side email handler — EmailJS credentials NEVER leave the server
// These env vars are set in Netlify Dashboard (no VITE_ prefix = server-only)

interface DemoRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  students: string;
  message: string;
  turnstileToken?: string;
}

// Simple in-memory rate limiter (per function instance)
const ipTimestamps = new Map<string, number[]>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipTimestamps.get(ip) || [];
  const recent = timestamps.filter((t) => t > now - RATE_LIMIT_WINDOW_MS);
  ipTimestamps.set(ip, recent);
  return recent.length >= RATE_LIMIT_MAX;
}

function recordRequest(ip: string): void {
  const timestamps = ipTimestamps.get(ip) || [];
  timestamps.push(Date.now());
  ipTimestamps.set(ip, timestamps);
}

// Strip HTML tags, newlines, and limit length
function sanitize(value: string, maxLen = 500): string {
  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/[\r\n]/g, " ")
    .trim()
    .substring(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s\-()]{7,20}$/.test(phone);
}

export default async (req: Request, context: Context) => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Rate limit by IP
  const clientIp = context.ip || "unknown";
  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please wait a few minutes." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // Parse body
  let body: DemoRequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Validate required fields
  const firstName = sanitize(body.firstName, 100);
  const lastName = sanitize(body.lastName, 100);
  const email = sanitize(body.email, 200);
  const phone = sanitize(body.phone, 30);
  const school = sanitize(body.school, 200);
  const students = sanitize(body.students, 10);
  const message = sanitize(body.message || "No specific challenges mentioned");

  if (!firstName || !lastName || !email || !phone || !school || !students) {
    return new Response(
      JSON.stringify({ error: "All fields are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!isValidEmail(email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email address" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!isValidPhone(phone)) {
    return new Response(
      JSON.stringify({ error: "Invalid phone number" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Verify Turnstile CAPTCHA (if configured)
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret && body.turnstileToken) {
    try {
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: body.turnstileToken,
            remoteip: clientIp,
          }),
        }
      );
      const verifyData = await verifyRes.json() as { success: boolean };
      if (!verifyData.success) {
        return new Response(
          JSON.stringify({ error: "CAPTCHA verification failed" }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
    } catch {
      // If Turnstile verification fails, continue anyway (don't block the user)
    }
  }

  // Read EmailJS credentials from server-side env vars (NOT exposed to frontend)
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const toEmail = process.env.CONTACT_EMAIL || "gyanamaedu@gmail.com";

  if (!serviceId || !templateId || !publicKey) {
    return new Response(
      JSON.stringify({ error: "Email service not configured. Please contact us directly." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // Send via EmailJS REST API (server-side — credentials never reach the browser)
  try {
    const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: toEmail,
          from_name: `${firstName} ${lastName}`,
          from_email: email,
          phone: phone,
          school_name: school,
          student_count: students,
          message: message,
        },
      }),
    });

    if (!emailRes.ok) {
      throw new Error(`EmailJS responded with ${emailRes.status}`);
    }

    recordRequest(clientIp);

    return new Response(
      JSON.stringify({ success: true, message: "Demo request sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Failed to send email. Please try again or contact us directly." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
