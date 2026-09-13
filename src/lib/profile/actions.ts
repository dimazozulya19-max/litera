"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import type { ProfileActionState } from "@/lib/profile/types";
import { createClient } from "@/lib/supabase/server";

const usernamePattern = /^[a-z0-9_]+$/;

export async function updateProfile(
  _previousState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const user = await requireUser();
  const usernameValue = formData.get("username");
  const displayNameValue = formData.get("displayName");
  const bioValue = formData.get("bio");

  if (
    typeof usernameValue !== "string" ||
    typeof displayNameValue !== "string" ||
    typeof bioValue !== "string"
  ) {
    return { message: "Не вдалося прочитати дані форми.", status: "error" };
  }

  const username = usernameValue.trim().toLowerCase();
  const displayName = displayNameValue.trim();
  const bio = bioValue.trim();

  if (
    username.length < 3 ||
    username.length > 30 ||
    !usernamePattern.test(username)
  ) {
    return {
      message: "Нік: 3–30 латинських літер, цифр або символів _.",
      status: "error",
    };
  }

  if (displayName.length > 80 || bio.length > 500) {
    return {
      message: "Ім’я або опис перевищують допустиму довжину.",
      status: "error",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      bio,
      display_name: displayName || null,
      username,
    })
    .eq("id", user.id);

  if (error?.code === "23505") {
    return { message: "Цей нік уже зайнятий.", status: "error" };
  }

  if (error) {
    return { message: "Не вдалося зберегти профіль.", status: "error" };
  }

  revalidatePath("/profile");

  return { message: "Профіль збережено.", status: "success" };
}
