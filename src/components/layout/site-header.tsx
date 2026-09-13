import Link from "next/link";
import { Suspense } from "react";
import { AuthNavigation, LoginLink } from "@/components/auth/auth-navigation";

const navigation = [
  { href: "/catalog", label: "Каталог" },
  { href: "/library", label: "Бібліотека" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 overflow-x-auto px-6 py-5 sm:px-10">
        <Link
          className="shrink-0 text-xl font-semibold tracking-tight text-primary"
          href="/"
        >
          Litera
        </Link>

        <nav
          aria-label="Головна навігація"
          className="ml-auto flex items-center gap-5 text-sm font-medium"
        >
          {navigation.map((item) => (
            <Link
              className="whitespace-nowrap text-muted transition-colors hover:text-primary"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Suspense fallback={<LoginLink />}>
            <AuthNavigation />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
