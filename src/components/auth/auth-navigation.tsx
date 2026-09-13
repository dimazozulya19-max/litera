import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";

export function LoginLink() {
  return (
    <Link
      className="whitespace-nowrap rounded-full border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-surface"
      href="/login"
    >
      Увійти
    </Link>
  );
}

export async function AuthNavigation() {
  const user = await getCurrentUser();

  if (!user) {
    return <LoginLink />;
  }

  return (
    <Link
      className="whitespace-nowrap rounded-full border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-surface"
      href="/profile"
    >
      Акаунт
    </Link>
  );
}
