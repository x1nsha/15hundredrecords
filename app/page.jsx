"use client";
import Image from "next/image";
import { useI18n } from "./components/I18nProvider";
import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Home() {
  const { t } = useI18n();
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();
  const stay = sp.get("stay") === "1";

  useEffect(() => {
    if (pathname === "/" && !stay) {
      const ref = sp.get("ref");
      const to = ref ? `/dashboard?ref=${encodeURIComponent(ref)}` : "/dashboard";
      router.replace(to);
    }
  }, [pathname, stay, sp, router]);

  if (pathname === "/" && !stay) return null;

  return (
        <div className="font-sans">
      <section id="hero" className="bg-gradient-to-b from-brand-50 to-background border-b border-black/10 dark:border-white/15">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">{t("hero.title")}</h1>
            <p className="mt-4 text-base sm:text-lg opacity-80 max-w-xl">
              {t("hero.subtitle")}
            </p>
              <div className="mt-8 flex items-center gap-3">
                  <a href="#showcase" className="inline-flex items-center h-11 px-5 rounded-full border border-black/10 dark:border-white/15 text-sm bg-black/5 hover:bg-black/10">{t("hero.cta.more")}</a>
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

        <section id="showcase" className="border-t border-black/10 dark:border-white/15 bg-gradient-to-b from-background to-background/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
                <h2 className="text-2xl sm:text-3xl font-semibold">{t("showcase.title")}</h2>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {["Night Drive","New Heat","Chill Vibes"].map((name, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/15 bg-black/5">
                            <div className="absolute -inset-10 bg-gradient-to-r from-brand-500/20 via-transparent to-brand-500/20 rotate-12 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                            <div className="relative p-5 flex flex-col h-56">
                                <div className="relative flex-1 rounded-xl overflow-hidden shadow-inner">
                                    <Image src="/x1nsha.jpg" alt={`playlist-${i}`} width={600} height={400} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse shadow-[0_0_20px_rgba(99,102,241,0.6)]" />
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div>
                                        <div className="text-sm opacity-70">Playlist</div>
                                        <div className="text-lg font-semibold">{name}</div>
                                    </div>
                                    <div className="text-2xl select-none">{["🌌","🔥","🌙"][i]}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="playlists" className="border-t border-black/10 dark:border-white/15 bg-gradient-to-b from-background to-background/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
                <h2 className="text-2xl sm:text-3xl font-semibold">{t("playlists.title")}</h2>
                <p className="mt-2 opacity-75">{t("playlists.subtitle")}</p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {["Night Drive","New Heat","Chill Vibes"].map((name, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/15 bg-black/5">
                            <div className="absolute -inset-10 bg-gradient-to-r from-brand-500/20 via-transparent to-brand-500/20 rotate-12 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                            <div className="relative p-5 flex flex-col h-56">
                                <div className="relative flex-1 rounded-xl overflow-hidden shadow-inner">
                                    <Image src="/x1nsha.jpg" alt={`playlist-${i}`} width={600} height={400} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse shadow-[0_0_20px_rgba(99,102,241,0.6)]" />
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div>
                                        <div className="text-sm opacity-70">Playlist</div>
                                        <div className="text-lg font-semibold">{name}</div>
                                    </div>
                                    <div className="text-2xl select-none">{["🌌","🔥","🌙"][i]}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
}