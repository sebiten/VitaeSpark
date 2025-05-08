"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect("/login?error=missing-fields");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error);
    redirect("/login?error=invalid-credentials");
  }

  revalidatePath("/", "layout");
  redirect("/crear"); // ✅ Redirecciona para crear un cv
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    redirect("/login?error=missing-fields");
  }

  // 1. Intentar registro
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name, // Esto se guarda en auth.users.user_metadata
      },
    },
  });

  if (error) {
    console.error("Signup error:", error);

    // Verificar el código de error directamente
    if (error.status === 422 && error.code === "user_already_exists") {
      redirect("/login?error=user-already-exists");
    }

    // Error genérico para otros casos
    redirect("/login?error=signup-failed");
  }

  // No redireccionamos aquí para permitir mostrar el mensaje de éxito
  // La redirección ocurrirá después de que el usuario inicie sesión

  // Si llegamos hasta aquí, el registro fue exitoso
  return;
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    throw new Error("Error cerrando sesión");
  }

  redirect("/"); // O donde quieras llevarlo después
}
