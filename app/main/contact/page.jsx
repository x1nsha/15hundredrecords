"use client";

import { useState } from "react";
import { useI18n } from "../../components/I18nProvider";

const MAX_SIZE = 25 * 1024 * 1024
const ACCEPTED_MIME = [
  "audio/wav",
  "audio/x-wav",
  "audio/mpeg",
  "audio/mp3",
];
const ACCEPTED_EXT = [".wav", ".mp3"];

export default function ContactPage() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = t("error.name.required");
    if (!email.trim()) e.email = t("error.email.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t("error.email.invalid");
    if (!message.trim()) e.message = t("error.message.required");
    if (file) {
      const extOk = ACCEPTED_EXT.some((ext) => file.name.toLowerCase().endsWith(ext));
      const mimeOk = !file.type || ACCEPTED_MIME.includes(file.type);
      if (!extOk && !mimeOk) e.file = t("error.file.type");
      if (file.size > MAX_SIZE) e.file = t("error.file.size");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    try {
      setStatus("sending");
      const fd = new FormData();
      fd.set("name", name);
      fd.set("email", email);
      fd.set("message", message);
      if (file) fd.set("file", file, file.name);

      const res = await fetch("/main/contact/api", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `HTTP ${res.status}`);
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setFile(null);
      setErrors({});
    } catch (err) {
      setStatus("error");
      setServerError(err?.message || "Failed to send");
    }
  };

  return (
    <div className="font-sans border-t border-black/10 dark:border-white/15">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{t("contact.title")}</h1>
        <p className="mt-2 opacity-75">{t("contact.subtitle")}</p>

        <form onSubmit={onSubmit} className="mt-8 w-full max-w-xl space-y-5">
          <div>
            <label className="block text-sm mb-1" htmlFor="name">{t("form.name")}</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 rounded-md border border-black/10 dark:border-white/15 bg-black/5 outline-none focus:ring-2 focus:ring-foreground/30"
              placeholder={t("form.name.placeholder")}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">{t("form.email")}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3 rounded-md border border-black/10 dark:border-white/15 bg-black/5 outline-none focus:ring-2 focus:ring-foreground/30"
              placeholder={t("form.email.placeholder")}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="message">{t("form.message")}</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full min-h-28 px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-black/5 outline-none focus:ring-2 focus:ring-foreground/30"
              placeholder={t("form.message.placeholder")}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="file">{t("form.file")}</label>
            <input
              id="file"
              type="file"
              accept=".wav,.mp3,audio/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-foreground/90 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border file:border-black/10 file:dark:border-white/15 file:bg-black/5 file:hover:bg-black/10 file:text-sm"
            />
            <p className="text-xs opacity-70 mt-1">{t("form.file.hint")}</p>
            {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center h-11 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? t("form.sending") : t("form.submit")}
            </button>
            {status === "success" && <span className="text-green-600 text-sm">{t("form.success")}</span>}
            {status === "error" && <span className="text-red-600 text-sm">{serverError}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
