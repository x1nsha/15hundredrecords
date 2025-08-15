This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.jsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


---

# Meta — Next.js Scaffold (App Router)

Этот проект реализует каркас сайта по макету «Meta» (ссылка из задачи) с использованием только Next.js (App Router) и Tailwind CSS v4. В репозитории настроены общие разделы, навигация, базовые интерактивные элементы и форма обратной связи для дальнейшей шлифовки под пиксель‑перфект специфику из Figma.

## Что реализовано
- Глобальный макет (app/layout.jsx) с фиксированной шапкой и подвалом.
- Адаптивное меню (бургер на мобильных), плавная прокрутка, якоря на секции.
- Главная страница (app/page.jsx) c разделами:
  - Hero (id="hero")
  - Возможности/Features (id="features")
  - Галерея/Showcase (id="showcase")
  - Отзывы/Testimonials (id="testimonials")
  - Контакты/Contact (id="contact")
- Форма обратной связи (app/components/ContactForm.jsx) с простой валидацией.
- Плейсхолдеры иконок в public/ (globe.svg, file.svg, window.svg).

## Как запустить
```bash
npm run dev
# затем откройте http://localhost:3000
```

## Сборка
```bash
npm run build
npm start
```

## Точки кастомизации под Figma
- Секция Hero, палитра, типографика: править классы в app/page.jsx и переменные в app/globals.css.
- Компоненты Header/Footer: app/components/Header.jsx, app/components/Footer.jsx.
- Замена иконок/изображений на из Figma: положить ассеты в /public и обновить пути в Image.
- Тексты/контент: редактировать напрямую в секциях app/page.jsx.

## Примечания
- Используется next/font для шрифтов Geist (см. app/layout.jsx). Плавный скролл и отступ для фиксированной шапки настроены в app/globals.css.
- Структура и классы готовы для быстрого доведения до пиксель‑перфект состояния по макету Figma.
