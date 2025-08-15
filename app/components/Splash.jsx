"use client";
import { useEffect, useState } from "react";

export default function Splash() {
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startClose = setTimeout(() => setClosing(true), 900);
    const hide = setTimeout(() => setVisible(false), 1300);
    return () => {
      clearTimeout(startClose);
      clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none splash-overlay${closing ? " closing" : ""}`}
      style={{ background: "var(--background)" }}
    >
      <img
        src="/icon.png"
        alt=""
        className={`h-200 w-150 select-none ${closing ? "splash-logo-out" : "splash-logo"}`}
        draggable={false}
      />
    </div>
  );
}
