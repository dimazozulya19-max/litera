import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Реєстрація | Litera",
};

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/library");
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Новий читач
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary">
        Реєстрація
      </h1>
      <p className="mt-4 text-muted">
        Створіть акаунт, щоб зберігати бібліотеку та прогрес читання.
      </p>
      <Card className="mt-8">
        <AuthForm mode="register" />
      </Card>
    </main>
  );
}
