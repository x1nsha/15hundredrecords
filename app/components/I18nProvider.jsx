"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const I18nContext = createContext(undefined);

const dict = {
  en: {
    brand: "15hundred",
    "nav.contacts": "Contacts",
    "nav.contactCta": "Contact",
    "header.openMenu": "Open menu",
    "switch.en": "EN",
    "switch.ru": "RU",
    "hero.title": "15hundred Records",
    "hero.subtitle": "A modern solution for your product. Fast, responsive and convenient.",
    "hero.cta.contact": "Contact",
    "hero.cta.more": "Learn more",
    "about.title": "About Us",
    "about.subtitle": "Who we are and what drives us.",
    "about.lead": "We are a creative team at 15hundred Records focused on crafting impactful releases and digital experiences that resonate with audiences.",
    "about.p1.title": "Our Mission",
    "about.p1.text": "Deliver meaningful sound and design with precision and soul.",
    "about.p2.title": "Our Approach",
    "about.p2.text": "Combine technology and artistry to craft distinctive experiences.",
    "about.p3.title": "What We Do",
    "about.p3.text": "Production, distribution, and digital solutions for modern creators.",
    "features.title": "Features",
    "features.subtitle": "Key advantages of the platform.",
    "features.itemTitle": "Feature {i}",
    "features.itemDesc": "Description of a key feature and value for the user.",
    "showcase.title": "Gallery",
    "showcase.subtitle": "Visual examples of interfaces and screens.",
    "testimonials.title": "Testimonials",
    "testimonials.quote": "Amazing experience. Simple and powerful tool.",
    "testimonials.author": "Ivan Ivanov",
    "contact.title": "Contact us",
    "contact.subtitle": "Leave your contact details and request.",
    "form.name": "Name",
    "form.email": "Email",
    "form.message": "Message",
    "form.name.placeholder": "Your name",
    "form.email.placeholder": "you@example.com",
    "form.message.placeholder": "Tell us about your request",
    "form.submit": "Send",
    "form.success": "Thanks! We will contact you.",
    "error.name.required": "Enter name",
    "error.email.required": "Enter email",
    "error.email.invalid": "Invalid email",
    "error.message.required": "Enter message",
    "footer.rights": "All rights reserved.",
  },
  ru: {
    brand: "15hundred",
    "nav.contacts": "Контакты",
    "nav.contactCta": "Связаться",
    "header.openMenu": "Открыть меню",
    "switch.en": "EN",
    "switch.ru": "RU",
    "hero.title": "15hundred Records",
    "hero.subtitle": "Современное решение для вашего продукта. Быстрая, адаптивная и удобная платформа.",
    "hero.cta.contact": "Связаться",
    "hero.cta.more": "Узнать больше",
    "about.title": "О нас",
    "about.subtitle": "Кто мы и что нас вдохновляет.",
    "about.lead": "Мы — креативная команда 15hundred Records. Создаём выразительные релизы и цифровые решения, которые находят отклик у аудитории.",
    "about.p1.title": "Наша миссия",
    "about.p1.text": "Делать значимый звук и дизайн — точно, честно и с душой.",
    "about.p2.title": "Наш подход",
    "about.p2.text": "Соединяем технологии и искусство, чтобы создавать уникальный опыт.",
    "about.p3.title": "Что мы делаем",
    "about.p3.text": "Продакшн, дистрибуция и цифровые решения для современных создателей.",
    "features.title": "Возможности",
    "features.subtitle": "Ключевые преимущества платформы.",
    "features.itemTitle": "Функция {i}",
    "features.itemDesc": "Описание ключевой функции и ценности для пользователя.",
    "showcase.title": "Галерея",
    "showcase.subtitle": "Наглядные примеры интерфейсов и экранов.",
    "testimonials.title": "Отзывы",
    "testimonials.quote": "Потрясающий опыт использования. Простой и мощный инструмент.",
    "testimonials.author": "Иван Иванов",
    "contact.title": "Свяжитесь с нами",
    "contact.subtitle": "Оставьте свои контакты и запрос.",
    "form.name": "Имя",
    "form.email": "Email",
    "form.message": "Сообщение",
    "form.name.placeholder": "Ваше имя",
    "form.email.placeholder": "you@example.com",
    "form.message.placeholder": "Расскажите о вашем запросе",
    "form.submit": "Отправить",
    "form.success": "Спасибо! Мы свяжемся с вами.",
    "error.name.required": "Введите имя",
    "error.email.required": "Введите email",
    "error.email.invalid": "Некорректный email",
    "error.message.required": "Введите сообщение",
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
