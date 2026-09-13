"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, register } from "@/lib/auth/actions";
import type { AuthActionState } from "@/lib/auth/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthActionState = {
  message: "",
  status: "idle",
};

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login";
  const [state, formAction, pending] = useActionState(
    isLogin ? login : register,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {!isLogin && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="displayName">
            Ім’я
          </label>
          <Input
            autoComplete="name"
            id="displayName"
            maxLength={80}
            name="displayName"
            placeholder="Як до вас звертатися"
          />
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="email">
          Електронна пошта
        </label>
        <Input
          autoComplete="email"
          id="email"
          name="email"
          placeholder="reader@example.com"
          required
          type="email"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="password">
          Пароль
        </label>
        <Input
          autoComplete={isLogin ? "current-password" : "new-password"}
          id="password"
          minLength={8}
          name="password"
          placeholder="Щонайменше 8 символів"
          required
          type="password"
        />
      </div>

      {state.message && (
        <p
          aria-live="polite"
          className={state.status === "error" ? "text-sm text-red-700" : "text-sm text-primary"}
        >
          {state.message}
        </p>
      )}

      <Button className="w-full" disabled={pending} type="submit">
        {pending ? "Зачекайте…" : isLogin ? "Увійти" : "Створити акаунт"}
      </Button>

      <p className="text-center text-sm text-muted">
        {isLogin ? "Ще немає акаунта?" : "Вже маєте акаунт?"}{" "}
        <Link
          className="font-semibold text-primary underline-offset-4 hover:underline"
          href={isLogin ? "/register" : "/login"}
        >
          {isLogin ? "Зареєструватися" : "Увійти"}
        </Link>
      </p>
    </form>
  );
}
