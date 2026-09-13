import type { Metadata } from "next";
import { logout } from "@/lib/auth/actions";
import { requireUser } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile/profile-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Профіль | Litera",
};

export default async function ProfilePage() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, bio")
    .eq("id", user.id)
    .single();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-10">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
        Особистий простір
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary">Профіль</h1>
      <Card className="mt-8 max-w-2xl">
        <p className="text-sm text-muted">Електронна пошта</p>
        <p className="mt-1 font-medium text-foreground">
          {user.email ?? "Не вказана"}
        </p>
        {profile ? (
          <div className="mt-8 border-t border-border pt-8">
            <ProfileForm
              bio={profile.bio}
              displayName={profile.display_name ?? ""}
              username={profile.username}
            />
          </div>
        ) : (
          <p className="mt-6 text-sm text-red-700">
            Не вдалося завантажити дані профілю.
          </p>
        )}
        <form action={logout} className="mt-8 border-t border-border pt-6">
          <Button type="submit" variant="secondary">
            Вийти
          </Button>
        </form>
      </Card>
    </main>
  );
}
