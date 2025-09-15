import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const MAX_SIZE = 25 * 1024 * 1024
const ACCEPTED_MIME = [
  "audio/wav",
  "audio/x-wav",
  "audio/mpeg",
  "audio/mp3",
];
const ACCEPTED_EXT = [".wav", ".mp3"];

function okJson(data, init = {}) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...init,
  });
}

function errorJson(message, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const file = form.get("file");

    if (!name) return errorJson("Name is required", 422);
    if (!email) return errorJson("Email is required", 422);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return errorJson("Invalid email", 422);
    if (!message) return errorJson("Message is required", 422);

    let attachment = null;
    if (file && typeof file === "object" && "arrayBuffer" in file) {
      const filename = file.name || "audio";
      const lower = filename.toLowerCase();
      const type = file.type || "";
      const size = file.size || 0;
      const extOk = ACCEPTED_EXT.some((ext) => lower.endsWith(ext));
      const mimeOk = !type || ACCEPTED_MIME.includes(type);
      if (!extOk && !mimeOk) return errorJson("Only .wav or .mp3 files are allowed", 415);
      if (size > MAX_SIZE) return errorJson("File is too large (max 25MB)", 413);
      const buff = Buffer.from(await file.arrayBuffer());
      attachment = { filename, content: buff, contentType: type || undefined };
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS || process.env.GMAIL_APP_PASSWORD;
    const to = process.env.CONTACT_TO || user;
    if (!user || !pass || !to) {
      return errorJson("Email is not configured on server (missing env)", 500);
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    const html = `
      <h2>New contact submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from: user,
      to,
      subject: `Contact form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html,
      attachments: attachment ? [attachment] : undefined,
    });

    return okJson({ ok: true });
  } catch (err) {
    console.error("/api/contact error", err);
    return errorJson("Failed to send", 500);
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
