"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/lib/profile/actions";
import type { ProfileActionState } from "@/lib/profile/types";

const initialState: ProfileActionState = {
  message: "",
  status: "idle",
};

type ProfileFormProps = {
  bio: string;
  displayName: string;
  username: string;
};

export function ProfileForm({ bio, displayName, username }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="displayName">
          Ім’я
        </label>
        <Input
          autoComplete="name"
          defaultValue={displayName}
          id="displayName"
          maxLength={80}
          name="displayName"
          placeholder="Як до вас звертатися"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="username">
          Унікальний нік
        </label>
        <Input
          autoCapitalize="none"
          autoComplete="username"
          defaultValue={username}
          id="username"
          maxLength={30}
          minLength={3}
          name="username"
          pattern="[a-z0-9_]+"
          required
        />
        <p className="text-xs text-muted">
          Латинські літери, цифри та _. Змінити можна пізніше.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="bio">
          Про себе
        </label>
        <textarea
          className="min-h-32 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          defaultValue={bio}
          id="bio"
          maxLength={500}
          name="bio"
          placeholder="Кілька слів про ваші читацькі вподобання"
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

      <Button disabled={pending} type="submit">
        {pending ? "Зберігаємо…" : "Зберегти профіль"}
      </Button>
    </form>
  );
}
