"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AuthActionState } from "@/lib/auth/types";
import { createClient } from "@/lib/supabase/server";

function readCredentials(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    !email.includes("@") ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return null;
  }

  return { email: email.trim(), password };
}

export async function login(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const credentials = readCredentials(formData);

  if (!credentials) {
    return {
      message: "Вкажіть коректну пошту та пароль від 8 символів.",
      status: "error",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return {
      message: "Не вдалося увійти. Перевірте пошту та пароль.",
      status: "error",
    };
  }

  revalidatePath("/", "layout");
  redirect("/library");
}

export async function register(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const credentials = readCredentials(formData);
  const displayName = formData.get("displayName");

  if (!credentials) {
    return {
      message: "Вкажіть коректну пошту та пароль від 8 символів.",
      status: "error",
    };
  }

  if (typeof displayName !== "string" || displayName.trim().length > 80) {
    return {
      message: "Ім’я має містити не більше 80 символів.",
      status: "error",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    ...credentials,
    options: {
      data: {
        display_name: displayName.trim() || null,
      },
    },
  });

  if (error) {
    return {
      message: "Не вдалося створити акаунт. Спробуйте іншу пошту.",
      status: "error",
    };
  }

  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/library");
  }

  return {
    message: "Акаунт створено. Перевірте пошту, щоб підтвердити реєстрацію.",
    status: "success",
  };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
