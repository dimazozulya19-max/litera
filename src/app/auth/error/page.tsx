import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Помилка підтвердження | Litera",
};

export default function AuthErrorPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <Card>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Авторизація
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-primary">
          Посилання не спрацювало
        </h1>
        <p className="mt-4 text-muted">
          Воно могло застаріти або вже бути використаним. Спробуйте увійти чи
          зареєструватися ще раз.
        </p>
        <Link
          className="mt-6 inline-flex font-semibold text-primary underline-offset-4 hover:underline"
          href="/login"
        >
          Повернутися до входу
        </Link>
      </Card>
    </main>
  );
}
