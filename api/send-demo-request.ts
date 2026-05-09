import type { VercelRequest, VercelResponse } from "@vercel/node";

// Server-side email handler — EmailJS credentials NEVER leave the server
// These env vars are set in Vercel Dashboard (no VITE_ prefix = server-only)

interface DemoRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  students: string;
  message: string;
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

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  if (Array.isArray(forwarded) && forwarded.length > 0) return forwarded[0];
  return req.socket?.remoteAddress || "unknown";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limit by IP
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please wait a few minutes." });
  }

  // Parse body (Vercel auto-parses JSON when Content-Type is application/json)
  let body: DemoRequestBody;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body as DemoRequestBody);
    if (!body) throw new Error("empty body");
  } catch {
    return res.status(400).json({ error: "Invalid request body" });
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
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!isValidPhone(phone)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  // Read EmailJS credentials from server-side env vars (NOT exposed to frontend)
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const toEmail = process.env.CONTACT_EMAIL || "gyanamaedu@gmail.com";

  if (!serviceId || !templateId || !publicKey) {
    return res
      .status(503)
      .json({ error: "Email service not configured. Please contact us directly." });
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

    return res.status(200).json({ success: true, message: "Demo request sent successfully" });
  } catch {
    return res
      .status(500)
      .json({ error: "Failed to send email. Please try again or contact us directly." });
  }
}
