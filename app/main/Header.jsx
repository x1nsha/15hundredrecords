"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useI18n } from "../components/I18nProvider";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t, lang, setLang } = useI18n();
    const [theme, setTheme] = useState(null);
    const [isChangingTheme, setIsChangingTheme] = useState(false);
    const [isChangingLang, setIsChangingLang] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 4);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        try {
            const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
            const preferredDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initial = stored === 'purple' || stored === 'dark' ? stored : (preferredDark ? 'dark' : 'purple');
            setTheme(initial);
            const root = document.documentElement;
            root.classList.remove('purple', 'dark');
            root.classList.add(initial);
        } catch {}
    }, []);

    useEffect(() => {
        if (!theme) return;
        try {
            const root = document.documentElement;
            root.classList.remove('purple', 'dark');
            root.classList.add(theme);
            localStorage.setItem('theme', theme);
        } catch {}
    }, [theme]);

    const toggleTheme = () => {
        setIsChangingTheme(true);
        setTheme((prev) => (prev === 'dark' ? 'purple' : 'dark'));
        setTimeout(() => setIsChangingTheme(false), 500);
    };

    const changeLanguage = (newLang) => {
        if (lang === newLang) return;
        setIsChangingLang(true);
        setLang(newLang);
        setTimeout(() => setIsChangingLang(false), 500);
    };

    const close = () => setOpen(false);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
            isScrolled ? "bg-background/80 backdrop-blur-md border-b border-black/10 dark:border-white/15" : ""
        }`}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="h-16 flex items-center justify-between relative">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <img src="/icon.png" alt="icon" className="h-20 w-15 rounded-md object-cover" />
                        <span className="sr-only">15hundred</span>
                    </Link>

                    <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
                        <a href="/dashboard" className="text-sm hover:text-brand-500 transition-colors">{t("dashboard.title")}</a>
                        <a href="/contact" className="text-sm hover:text-brand-500 transition-colors">{t("nav.contacts")}</a>
                    </nav>

                    <nav className="hidden md:flex items-center gap-6">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className={`relative inline-flex items-center justify-center h-9 w-9 rounded-full border border-black/10 dark:border-white/15 bg-black/5 hover:bg-black/10 transition-all duration-300 ${
                                isChangingTheme ? 'transform scale-110' : ''
                            }`}
                        >
                            <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-100 dark:opacity-0">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                                </svg>
                            </span>
                            <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 dark:opacity-100">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            </span>
                            {isChangingTheme && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <span className="animate-ping absolute h-5 w-5 rounded-full bg-brand-500 opacity-75"></span>
                                </span>
                            )}
                        </button>
                        <div className="flex items-center gap-1 ml-2 relative">
                            <button
                                type="button"
                                onClick={() => changeLanguage("en")}
                                aria-pressed={lang === "en"}
                                className={`h-8 px-2 rounded-md text-xs border transition-all duration-300 ${
                                    lang === "en"
                                        ? "bg-brand-500 text-white border-brand-600 shadow-lg shadow-brand-500/20"
                                        : "border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5"
                                } ${isChangingLang ? 'opacity-70' : ''}`}
                            >
                                {t("switch.en")}
                            </button>
                            <button
                                type="button"
                                onClick={() => changeLanguage("ru")}
                                aria-pressed={lang === "ru"}
                                className={`h-8 px-2 rounded-md text-xs border transition-all duration-300 ${
                                    lang === "ru"
                                        ? "bg-brand-500 text-white border-brand-600 shadow-lg shadow-brand-500/20"
                                        : "border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5"
                                } ${isChangingLang ? 'opacity-70' : ''}`}
                            >
                                {t("switch.ru")}
                            </button>
                            {isChangingLang && (
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                                </span>
                            )}
                        </div>
                    </nav>

                    <button
                        aria-label={t("header.openMenu")}
                        className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-black/10 dark:border-white/15 transition-all hover:scale-105"
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
                <div className="md:hidden border-t border-black/10 dark:border-white/15 bg-background transition-all duration-300">
                    <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3">
                        <a
                            href="/dashboard"
                            onClick={close}
                            className="py-2 text-base transition-colors hover:text-brand-500"
                        >
                            {t("dashboard.title")}
                        </a>
                        <a
                            href="/contact"
                            onClick={close}
                            className="py-2 text-base transition-colors hover:text-brand-500"
                        >
                            {t("nav.contacts")}
                        </a>
                        <div className="flex items-center gap-2 pt-2 relative">
                            <button
                                type="button"
                                onClick={() => { changeLanguage("en"); close(); }}
                                aria-pressed={lang === "en"}
                                className={`h-9 px-3 rounded-md text-sm border transition-all duration-300 ${
                                    lang === "en"
                                        ? "bg-brand-500 text-white border-brand-600 shadow-lg shadow-brand-500/20"
                                        : "border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5"
                                } ${isChangingLang ? 'opacity-70' : ''}`}
                            >
                                {t("switch.en")}
                            </button>
                            <button
                                type="button"
                                onClick={() => { changeLanguage("ru"); close(); }}
                                aria-pressed={lang === "ru"}
                                className={`h-9 px-3 rounded-md text-sm border transition-all duration-300 ${
                                    lang === "ru"
                                        ? "bg-brand-500 text-white border-brand-600 shadow-lg shadow-brand-500/20"
                                        : "border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5"
                                } ${isChangingLang ? 'opacity-70' : ''}`}
                            >
                                {t("switch.ru")}
                            </button>

                        {isChangingLang && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                                </span>
                        )}
                    </div>
                </div>
                </div>
                )}
</header>
);
}