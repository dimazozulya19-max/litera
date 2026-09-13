import Link from "next/link";

const navigation = [
  { href: "/catalog", label: "Каталог" },
  { href: "/library", label: "Бібліотека" },
  { href: "/profile", label: "Профіль" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 overflow-x-auto px-6 py-5 sm:px-10">
        <Link className="shrink-0 text-xl font-semibold tracking-tight" href="/">
          Litera
        </Link>

        <nav
          aria-label="Головна навігація"
          className="ml-auto flex items-center gap-5 text-sm font-medium"
        >
          {navigation.map((item) => (
            <Link
              className="whitespace-nowrap text-black/60 transition-colors hover:text-black"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="whitespace-nowrap rounded-full border border-black/15 px-4 py-2 transition-colors hover:bg-black hover:text-white"
            href="/login"
          >
            Увійти
          </Link>
        </nav>
      </div>
    </header>
  );
}
