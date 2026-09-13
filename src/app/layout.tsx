import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Litera",
  description: "Ваша особиста бібліотека та історія читання.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={`${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
