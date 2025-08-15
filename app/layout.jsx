import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { I18nProvider } from "./components/I18nProvider";
import Splash from "./components/Splash";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "15hundred Records",
  description: "Meta layout site (Next.js)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Splash />
        <I18nProvider>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
