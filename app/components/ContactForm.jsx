"use client";

import { useState } from "react";
import { useI18n } from "./I18nProvider";

export default function ContactForm() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = t("error.name.required");
    if (!email.trim()) e.email = t("error.email.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t("error.email.invalid");
    if (!message.trim()) e.message = t("error.message.required");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setTimeout(() => {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 300);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl space-y-4">
      <div>
        <label className="block text-sm mb-1" htmlFor="name">{t("form.name")}</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-11 px-3 rounded-md border border-black/10 dark:border-white/15 bg-transparent outline-none focus:ring-2 focus:ring-foreground/30"
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
          className="w-full h-11 px-3 rounded-md border border-black/10 dark:border-white/15 bg-transparent outline-none focus:ring-2 focus:ring-foreground/30"
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
          className="w-full min-h-28 px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-transparent outline-none focus:ring-2 focus:ring-foreground/30"
          placeholder={t("form.message.placeholder")}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" className="inline-flex items-center h-11 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90">
          {t("form.submit")}
        </button>
        {submitted && <span className="text-green-600 text-sm">{t("form.success")}</span>}
      </div>
    </form>
  );
}
