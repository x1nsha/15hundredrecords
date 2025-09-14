"use client";
import Image from "next/image";
import { useI18n } from "./components/I18nProvider";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const { t } = useI18n();
  const router = useRouter();
  const sp = useSearchParams();
  const stay = sp.get("stay") === "1";

  useEffect(() => {
    if (!stay) {
      const ref = sp.get("ref");
      const to = ref ? `/dashboard?ref=${encodeURIComponent(ref)}` : "/dashboard";
      router.replace(to);
    }
  }, [stay, sp, router]);

  if (!stay) return null;

  return (
    <div className="font-sans">
      <section id="hero" className="bg-gradient-to-b from-brand-50 to-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">{t("hero.title")}</h1>
            <p className="mt-4 text-base sm:text-lg opacity-80 max-w-xl">
              {t("hero.subtitle")}
            </p>
              <div className="mt-8 flex items-center gap-3">
                  <a href="#showcase" className="inline-flex items-center h-11 px-5 rounded-full border border-black/10 dark:border-white/15 text-sm bg-black/5 hover:bg-black/10">{t("hero.cta.more")}</a>
                  <a href="/contact" className="inline-flex items-center h-11 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">{t("nav.contactCta")}</a>
              </div>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <Image src="/Wawe.png" alt="Hero" width={800} height={120} priority />
          </div>
        </div>
      </section>

        <section id="features" className="border-t border-black/10 dark:border-white/15">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
                <h2 className="text-2xl sm:text-3xl font-semibold">{t("features.title")}</h2>
                <p className="mt-2 opacity-75">{t("features.subtitle")}</p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1,2,3,4,5,6].map((i) => (
                        <div key={i} className="rounded-xl border border-black/10 dark:border-white/15 p-6 bg-black/5">
                            <div className="h-10 w-10 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center">
                                <Image src="/globe.svg" alt="icon" width={20} height={20} />
                            </div>
                            <h3 className="mt-4 font-medium">{t("features.itemTitle", { i })}</h3>
                            <p className="mt-2 text-sm opacity-80">{t("features.itemDesc")}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="showcase" className="border-t border-black/10 dark:border-white/15">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
                <h2 className="text-2xl sm:text-3xl font-semibold">{t("showcase.title")}</h2>
                <p className="mt-2 opacity-75">{t("showcase.subtitle")}</p>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {["/file.svg","/window.svg","/globe.svg","/Wawe.png","/file.svg"].map((src, idx) => (
                        <div key={idx} className="aspect-[4/3] rounded-lg border border-black/10 dark:border-white/15 bg-background/50 flex items-center justify-center">
                            <Image src={src} alt={`preview-${idx}`} width={64} height={64} />
                        </div>
                    ))}
                </div>
            </div>
        </section>

    </div>
  );
}