"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useI18n } from "./I18nProvider";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, lang, setLang } = useI18n();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
      isScrolled ? "bg-background/80 backdrop-blur-md border-b border-black/10 dark:border-white/15" : ""
    }`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link href="#hero" className="font-semibold text-lg tracking-tight">
            15hundred
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#contact" className="inline-flex items-center h-9 px-4 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
              {t("nav.contactCta")}
            </a>
            <div className="flex items-center gap-1 ml-2">
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={`h-8 px-2 rounded-md text-xs border border-black/10 dark:border-white/15 ${lang === "en" ? "bg-black/5 dark:bg-white/10" : ""}`}
              >
                {t("switch.en")}
              </button>
              <button
                type="button"
                onClick={() => setLang("ru")}
                aria-pressed={lang === "ru"}
                className={`h-8 px-2 rounded-md text-xs border border-black/10 dark:border-white/15 ${lang === "ru" ? "bg-black/5 dark:bg-white/10" : ""}`}
              >
                {t("switch.ru")}
              </button>
            </div>
          </nav>

          <button
            aria-label={t("header.openMenu")}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-black/10 dark:border-white/15"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="i-[]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {open ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-black/10 dark:border-white/15 bg-background">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={close}
              className="py-2 text-base"
            >
              {t("nav.contacts")}
            </a>
            <a
              href="#contact"
              onClick={close}
              className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-foreground text-background text-sm font-medium"
            >
              {t("nav.contactCta")}
            </a>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => { setLang("en"); close(); }}
                aria-pressed={lang === "en"}
                className={`h-9 px-3 rounded-md text-sm border border-black/10 dark:border-white/15 ${lang === "en" ? "bg-black/5 dark:bg-white/10" : ""}`}
              >
                {t("switch.en")}
              </button>
              <button
                type="button"
                onClick={() => { setLang("ru"); close(); }}
                aria-pressed={lang === "ru"}
                className={`h-9 px-3 rounded-md text-sm border border-black/10 dark:border-white/15 ${lang === "ru" ? "bg-black/5 dark:bg-white/10" : ""}`}
              >
                {t("switch.ru")}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
