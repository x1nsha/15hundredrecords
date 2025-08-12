"use client";

import { useI18n } from "./I18nProvider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-black/10 dark:border-white/15 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm opacity-70">© {new Date().getFullYear()} Meta. {t("footer.rights")}</p>
      </div>
    </footer>
  );
}
