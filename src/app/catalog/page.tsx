import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог | Litera",
};

export default function CatalogPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-10">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Розділ Litera
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary">Каталог</h1>
      <p className="mt-4 max-w-xl text-muted">
        Тут з’являться книги, манга, ранобе та інші історії.
      </p>
    </main>
  );
}
