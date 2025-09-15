"use client";

import { useI18n } from "../components/I18nProvider";
import { useEffect, useState } from "react";

export default function Footer() {
  const { t } = useI18n();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (_) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="border-t border-brand-200 dark:border-brand-800 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm opacity-70">© {new Date().getFullYear()} || 15hundred Records. {t("footer.rights")}</p>
        <div className="flex items-center gap-3 text-foreground/80">
          <a
            href="https://www.tiktok.com/@15hundredrecords"
            aria-label="TikTok"
            title="TikTok"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/15 hover:bg-foreground/10 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.5 3c.3 2.1 1.7 3.9 3.6 4.6 0 0 1.1.4 1.9.4v2.5c-1 0-2-.2-2.9-.6-.7-.3-1.4-.8-2-.1v4.9c0 3-2.4 5.4-5.4 5.4S3.9 17.7 3.9 14.7s2.4-5.4 5.4-5.4c.4 0 .7 0 1.1.1v2.6c-.3-.1-.7-.2-1.1-.2-1.6 0-2.9 1.3-2.9 2.9S7.7 17.5 9.3 17.5s2.9-1.3 2.9-2.9V3h1.3z" />
            </svg>
          </a>
          <a
            href="#instagram"
            aria-label="Instagram"
            title="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/15 hover:bg-foreground/10 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <rect x="3.5" y="3.5" width="17" height="17" rx="4" ry="4"></rect>
              <circle cx="12" cy="12" r="3.5"></circle>
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"></circle>
            </svg>
          </a>
          <a
            href="#youtube"
            aria-label="YouTube"
            title="YouTube"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/15 hover:bg-foreground/10 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M22 12s0-3-.4-4.4c-.3-1-1.1-1.8-2.1-2.1C17 5 12 5 12 5s-5 0-7.5.5c-1 .3-1.8 1.1-2.1 2.1C2 9 2 12 2 12s0 3 .4 4.4c.3 1 1.1 1.8 2.1 2.1C7 19 12 19 12 19s5 0 7.5-.5c1-.3 1.8-1.1 2.1-2.1.4-1.4.4-4.4.4-4.4zM10 9.75l4.5 2.25L10 14.25v-4.5z" />
            </svg>
          </a>
          <a
            href="#discord"
            aria-label="Discord"
            title="Discord"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/15 hover:bg-foreground/10 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.164-.402-.409-.874-.62-1.249a.077.077 0 0 0-.079-.037 19.77 19.77 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.045-.32 13.579.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.105c-.652-.247-1.273-.549-1.872-.892a.077.077 0 0 1-.008-.127c.125-.094.25-.192.369-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.244.198.369.292a.077.077 0 0 1-.006.127c-.598.35-1.22.652-1.873.899a.077.077 0 0 0-.041.106c.36.698.772 1.363 1.225 1.993a.078.078 0 0 0 .084.028 19.876 19.876 0 0 0 6.002-3.03.077.077 0 0 0 .031-.055c.5-5.177-.838-9.673-3.548-13.661a.06.06 0 0 0-.031-.03zm-12.3 9.13c-1.183 0-2.157-1.09-2.157-2.421 0-1.332.96-2.422 2.157-2.422 1.206 0 2.17 1.1 2.157 2.422 0 1.331-.96 2.421-2.157 2.421zm7.978 0c-1.183 0-2.157-1.09-2.157-2.421 0-1.332.96-2.422 2.157-2.422 1.206 0 2.17 1.1 2.157 2.422 0 1.331-.951 2.421-2.157 2.421z" />
            </svg>
          </a>
        </div>
      </div>

      {showTop && (
        <button
          onClick={handleScrollTop}
          aria-label="Scroll to top"
          title="Scroll to top"
          className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg border border-black/10 dark:border-white/15 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-foreground/40"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      )}
    </footer>
  );
}
