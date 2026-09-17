import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/inquiry
 * Sends an inquiry email from the public site to gracechoihappy@gmail.com.
 *
 * Body:
 *   { name, email, phone?, message, propertyTitle?, propertyUrl?, agentName? }
 *
 * Environment variables (set in Vercel / .env.local):
 *   - SMTP_HOST        (e.g. smtp.gmail.com)
 *   - SMTP_PORT        (e.g. 465 for SSL, 587 for STARTTLS)
 *   - SMTP_USER        (the sending Gmail address)
 *   - SMTP_PASS        (Gmail App Password — NOT your regular Gmail password)
 *   - INQUIRY_TO_EMAIL (defaults to gracechoihappy@gmail.com)
 *   - INQUIRY_FROM_EMAIL (defaults to SMTP_USER)
 *
 * For local dev without SMTP configured, the endpoint falls back to a
 * "log-only" mode — it returns success and prints the would-be email to
 * the server console so you can demo the flow.
 */

const DEFAULT_TO = "gracechoihappy@gmail.com";

interface InquiryBody {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  propertyTitle?: string;
  propertyAddress?: string;
  propertyPrice?: string;
  agentName?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPlainText(b: InquiryBody): string {
  const lines = [
    "New Estata property inquiry",
    "============================",
    "",
    `Name:       ${b.name ?? "—"}`,
    `Email:      ${b.email ?? "—"}`,
    `Phone:      ${b.phone ?? "—"}`,
    "",
  ];
  if (b.propertyTitle) lines.push(`Property:   ${b.propertyTitle}`);
  if (b.propertyAddress) lines.push(`Address:    ${b.propertyAddress}`);
  if (b.propertyPrice) lines.push(`Price:      ${b.propertyPrice}`);
  if (b.agentName) lines.push(`Agent:      ${b.agentName}`);
  if (b.propertyTitle || b.propertyAddress || b.propertyPrice || b.agentName) {
    lines.push("");
  }
  lines.push("Message:", b.message ?? "—", "");
  lines.push(`Received:   ${new Date().toISOString()}`);
  return lines.join("\n");
}

function buildHtml(b: InquiryBody): string {
  const rows: string[] = [
    `<tr><td style="padding:6px 12px;color:#666;">Name</td><td style="padding:6px 12px;font-weight:600;">${escapeHtml(b.name ?? "—")}</td></tr>`,
    `<tr><td style="padding:6px 12px;color:#666;">Email</td><td style="padding:6px 12px;font-weight:600;">${escapeHtml(b.email ?? "—")}</td></tr>`,
    `<tr><td style="padding:6px 12px;color:#666;">Phone</td><td style="padding:6px 12px;font-weight:600;">${escapeHtml(b.phone ?? "—")}</td></tr>`,
  ];
  if (b.propertyTitle)
    rows.push(`<tr><td style="padding:6px 12px;color:#666;">Property</td><td style="padding:6px 12px;font-weight:600;">${escapeHtml(b.propertyTitle)}</td></tr>`);
  if (b.propertyAddress)
    rows.push(`<tr><td style="padding:6px 12px;color:#666;">Address</td><td style="padding:6px 12px;font-weight:600;">${escapeHtml(b.propertyAddress)}</td></tr>`);
  if (b.propertyPrice)
    rows.push(`<tr><td style="padding:6px 12px;color:#666;">Price</td><td style="padding:6px 12px;font-weight:600;">${escapeHtml(b.propertyPrice)}</td></tr>`);
  if (b.agentName)
    rows.push(`<tr><td style="padding:6px 12px;color:#666;">Agent</td><td style="padding:6px 12px;font-weight:600;">${escapeHtml(b.agentName)}</td></tr>`);

  return `<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f6f6f6;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">
    <div style="background:#dc2626;color:#fff;padding:18px 24px;">
      <div style="font-size:18px;font-weight:700;">New property inquiry</div>
      <div style="font-size:12px;opacity:0.9;margin-top:2px;">Estata NY/NJ · ${escapeHtml(
        new Date().toLocaleString("en-US")
      )}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#111;">
      ${rows.join("\n")}
    </table>
    <div style="padding:14px 24px;border-top:1px solid #eee;background:#fafafa;">
      <div style="font-size:12px;color:#666;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">Message</div>
      <div style="white-space:pre-wrap;font-size:14px;line-height:1.5;">${escapeHtml(
        b.message ?? "—"
      )}</div>
    </div>
    <div style="padding:12px 24px;font-size:11px;color:#999;background:#fafafa;border-top:1px solid #eee;">
      Sent from the inquiry form on your Estata website.
    </div>
  </div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as InquiryBody;

    // Basic validation
    if (!body || !body.name || !body.email || !body.message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const toEmail = process.env.INQUIRY_TO_EMAIL || DEFAULT_TO;
    const fromEmail =
      process.env.INQUIRY_FROM_EMAIL || process.env.SMTP_USER || "noreply@estata.local";

    const subject = body.propertyTitle
      ? `[Estata Inquiry] ${body.propertyTitle} — from ${body.name}`
      : `[Estata Inquiry] General question from ${body.name}`;

    const text = buildPlainText(body);
    const html = buildHtml(body);

    // If SMTP is not configured, log the email and return success (dev mode)
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log("\n========== INQUIRY EMAIL (dev mode — SMTP not configured) ==========");
      console.log(`To:      ${toEmail}`);
      console.log(`From:    ${fromEmail}`);
      console.log(`Subject: ${subject}`);
      console.log("------------------------------------------------------------------");
      console.log(text);
      console.log("====================================================================\n");

      return NextResponse.json({
        ok: true,
        mode: "dev",
        message:
          "Inquiry received (dev mode — SMTP not configured, logged to server).",
        toEmail,
      });
    }

    // Production mode — actually send the email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Estata Website\" <${fromEmail}>`,
      to: toEmail,
      replyTo: body.email, // reply goes directly to the inquirer
      subject,
      text,
      html,
    });

    return NextResponse.json({
      ok: true,
      mode: "production",
      message: "Inquiry email sent successfully.",
    });
  } catch (err) {
    console.error("Inquiry API error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to send inquiry. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/inquiry",
    method: "POST",
    required: ["name", "email", "message"],
    optional: ["phone", "propertyTitle", "propertyAddress", "propertyPrice", "agentName"],
  });
}
