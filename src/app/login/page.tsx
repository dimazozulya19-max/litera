import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вхід | Litera",
};

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-10">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Обліковий запис
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary">Вхід</h1>
      <p className="mt-4 max-w-xl text-muted">
        Форму входу додамо разом з авторизацією.
      </p>
    </main>
  );
}
