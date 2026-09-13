import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профіль | Litera",
};

export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-10">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/45">
        Особистий простір
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Профіль</h1>
      <p className="mt-4 max-w-xl text-black/60">
        Тут з’являться дані користувача та його читацький шлях.
      </p>
    </main>
  );
}
