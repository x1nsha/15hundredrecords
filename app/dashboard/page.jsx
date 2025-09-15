"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "../components/I18nProvider";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const { t } = useI18n();
  const sp = useSearchParams();
  const [refCode, setRefCode] = useState("");
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    try {
      const fromUrl = sp.get("ref");
      if (fromUrl && fromUrl.trim()) {
        setRefCode(fromUrl.trim());
        document.cookie = `ref=${encodeURIComponent(fromUrl.trim())}; path=/; max-age=${60 * 60 * 24 * 90}`;
        if (typeof window !== "undefined") localStorage.setItem("ref", fromUrl.trim());
      } else {
        const cookieMatch = (typeof document !== "undefined" ? document.cookie : "").match(/(?:^|; )ref=([^;]*)/);
        const fromCookie = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
        const fromStorage = typeof window !== "undefined" ? localStorage.getItem("ref") : null;
        const value = fromUrl || fromCookie || fromStorage || "";
        if (value) setRefCode(value);
      }
    } catch {}
  }, [sp]);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeString = useMemo(() =>
    new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(time)
  , [time]);

  return (
    <div className="font-sans">
      <section className="bg-gradient-to-b from-brand-50 to-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {t("hero.title")}
            </h1>
            <p className="mt-3 opacity-80">
              {t("dashboard.welcome")} {refCode ? (
                <span className="inline-flex items-center gap-2 ml-2 px-3 py-1 rounded-full border border-black/10 dark:border-white/15 bg-black/5 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse" />
                  {t("dashboard.refSaved", { ref: refCode })}
                </span>
              ) : null}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/?stay=1#hero" className="inline-flex items-center h-11 px-5 rounded-full border border-black/10 dark:border-white/15 bg-black/5 hover:bg-black/10 text-sm">
                {t("dashboard.gotoLanding")}
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center">
            <div className="relative h-56 w-56 sm:h-64 sm:w-64 rounded-full border border-black/10 dark:border-white/15 bg-black/5 flex items-center justify-center shadow-inner">
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-black/70 to-black/40 border border-white/10 animate-spin"
                   style={{ animationDuration: "12s" }} />
              <div className="absolute inset-8 rounded-full border border-white/10 opacity-60"></div>
              <div className="absolute inset-12 rounded-full border border-white/10 opacity-40"></div>
              <div className="absolute inset-16 rounded-full border border-white/10 opacity-30"></div>
              <div className="absolute h-20 w-20 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold shadow-md">
                  {t("dashboard.nowPlaying")}
              </div>
              <div className="absolute h-1 w-1 rounded-full bg-white/90"></div>
              <div className="absolute h-0.5 w-30 bg-white/90 origin-right left-2"
                   style={{ transform: `rotate(${time.getSeconds() * 6}deg)` }} />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-black/10 dark:border-white/15 bg-gradient-to-b from-background to-background/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-3">
              <h2 className="text-2xl sm:text-3xl font-semibold">{t("about.title")}</h2>
              <p className="mt-2 opacity-75">{t("about.subtitle")}</p>
              <p className="mt-6 text-base sm:text-lg leading-relaxed opacity-90">
                {t("about.lead")}
              </p>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-black/10 dark:border-white/15 p-5 bg-black/5">
                <div className="h-9 w-9 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center">
                  <Image src="/globe.svg" alt="icon" width={18} height={18} />
                </div>
                <h3 className="mt-4 font-medium">{t("about.p1.title")}</h3>
                <p className="mt-2 text-sm opacity-80">{t("about.p1.text")}</p>
              </div>
              <div className="rounded-xl border border-black/10 dark:border-white/15 p-5 bg-black/5">
                <div className="h-9 w-9 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center">
                  <Image src="/window.svg" alt="icon" width={18} height={18} />
                </div>
                <h3 className="mt-4 font-medium">{t("about.p2.title")}</h3>
                <p className="mt-2 text-sm opacity-80">{t("about.p2.text")}</p>
              </div>
              <div className="rounded-xl border border-black/10 dark:border-white/15 p-5 bg-black/5 sm:col-span-2">
                <div className="h-9 w-9 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center">
                  <Image src="/file.svg" alt="icon" width={18} height={18} />
                </div>
                <h3 className="mt-4 font-medium">{t("about.p3.title")}</h3>
                <p className="mt-2 text-sm opacity-80">{t("about.p3.text")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
