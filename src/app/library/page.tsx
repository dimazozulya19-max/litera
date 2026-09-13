import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бібліотека | Litera",
};

export default function LibraryPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-10">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Ваш простір
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary">Бібліотека</h1>
      <p className="mt-4 max-w-xl text-muted">
        Тут будуть зберігатися ваші твори та прогрес читання.
      </p>
    </main>
  );
}
