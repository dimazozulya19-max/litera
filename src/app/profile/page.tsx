import type { Metadata } from "next";
import { logout } from "@/lib/auth/actions";
import { requireUser } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Профіль | Litera",
};

export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-10">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Особистий простір
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary">Профіль</h1>
      <Card className="mt-8 max-w-xl">
        <p className="text-sm text-muted">Електронна пошта</p>
        <p className="mt-1 font-medium text-foreground">
          {user.email ?? "Не вказана"}
        </p>
        <form action={logout} className="mt-6">
          <Button type="submit" variant="secondary">
            Вийти
          </Button>
        </form>
      </Card>
    </main>
  );
}
