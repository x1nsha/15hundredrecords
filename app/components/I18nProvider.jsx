"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const I18nContext = createContext(undefined);

const dict = {
  en: {
    brand: "Meta",
    // Header / Nav
    "nav.contacts": "Contacts",
    "nav.contactCta": "Contact",
    "header.openMenu": "Open menu",
    "switch.en": "EN",
    "switch.ru": "RU",

    // Hero
    "hero.title": "Meta Platform",
    "hero.subtitle": "A modern solution for your product. Fast, responsive and convenient.",
    "hero.cta.contact": "Contact",
    "hero.cta.more": "Learn more",

    // Features
    "features.title": "Features",
    "features.subtitle": "Key advantages of the platform.",
    "features.itemTitle": "Feature {i}",
    "features.itemDesc": "Description of a key feature and value for the user.",

    // Showcase
    "showcase.title": "Gallery",
    "showcase.subtitle": "Visual examples of interfaces and screens.",

    // Testimonials
    "testimonials.title": "Testimonials",
    "testimonials.quote": "Amazing experience. Simple and powerful tool.",
    "testimonials.author": "Ivan Ivanov",

    // Contact section
    "contact.title": "Contact us",
    "contact.subtitle": "Leave your contact details and request.",

    // Contact Form
    "form.name": "Name",
    "form.email": "Email",
    "form.message": "Message",
    "form.name.placeholder": "Your name",
    "form.email.placeholder": "you@example.com",
    "form.message.placeholder": "Tell us about your request",
    "form.submit": "Send",
    "form.success": "Thanks! We will contact you.",

    // Errors
    "error.name.required": "Enter name",
    "error.email.required": "Enter email",
    "error.email.invalid": "Invalid email",
    "error.message.required": "Enter message",

    // Footer
    "footer.rights": "All rights reserved.",
  },
  ru: {
    brand: "Meta",
    // Header / Nav
    "nav.contacts": "Контакты",
    "nav.contactCta": "Связаться",
    "header.openMenu": "Открыть меню",
    "switch.en": "EN",
    "switch.ru": "RU",

    // Hero
    "hero.title": "Платформа Meta",
    "hero.subtitle": "Современное решение для вашего продукта. Быстрая, адаптивная и удобная платформа.",
    "hero.cta.contact": "Связаться",
    "hero.cta.more": "Узнать больше",

    // Features
    "features.title": "Возможности",
    "features.subtitle": "Ключевые преимущества платформы.",
    "features.itemTitle": "Функция {i}",
    "features.itemDesc": "Описание ключевой функции и ценности для пользователя.",

    // Showcase
    "showcase.title": "Галерея",
    "showcase.subtitle": "Наглядные примеры интерфейсов и экранов.",

    // Testimonials
    "testimonials.title": "Отзывы",
    "testimonials.quote": "Потрясающий опыт использования. Простой и мощный инструмент.",
    "testimonials.author": "Иван Иванов",

    // Contact section
    "contact.title": "Свяжитесь с нами",
    "contact.subtitle": "Оставьте свои контакты и запрос.",

    // Contact Form
    "form.name": "Имя",
    "form.email": "Email",
    "form.message": "Сообщение",
    "form.name.placeholder": "Ваше имя",
    "form.email.placeholder": "you@example.com",
    "form.message.placeholder": "Расскажите о вашем запросе",
    "form.submit": "Отправить",
    "form.success": "Спасибо! Мы свяжемся с вами.",

    // Errors
    "error.name.required": "Введите имя",
    "error.email.required": "Введите email",
    "error.email.invalid": "Некорректный email",
    "error.message.required": "Введите сообщение",

    // Footer
    "footer.rights": "Все права защищены.",
  },
};

function interpolate(template, params) {
  if (!params) return template;
  return template.replace(/\{(.*?)\}/g, (_, k) => String(params[k] ?? ""));
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (saved === "en" || saved === "ru") setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      // Update html lang attribute for accessibility/SEO
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    t: (key, params) => {
      const base = (dict[lang] && dict[lang][key]) ?? key;
      return interpolate(base, params);
    },
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
