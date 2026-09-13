import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Litera",
  description: "Ваша особиста бібліотека та історія читання.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className="h-full">
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
