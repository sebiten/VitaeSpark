"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { normalizeAuthRedirect } from "@/lib/auth-redirect";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const next = normalizeAuthRedirect(formData.get("next") as string | null);

  if (!email || !password) {
    redirect(buildLoginRedirect("missing-fields", next));
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error);
    redirect(buildLoginRedirect("invalid-credentials", next));
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const next = normalizeAuthRedirect(formData.get("next") as string | null);

  if (!name || !email || !password) {
    redirect(buildLoginRedirect("missing-fields", next));
  }

  // 1. Intentar registro
  const { error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });
  // actualicacion de react 
  if (signupError) {
    if (
      signupError.status === 422 &&
      signupError.code === "user_already_exists"
    ) {
      redirect(buildLoginRedirect("user-already-exists", next));
    }

    if (signupError.message?.toLowerCase().includes("password")) {
      redirect(buildLoginRedirect("weak_password", next));
    }

    if (signupError.message?.toLowerCase().includes("email")) {
      redirect(buildLoginRedirect("invalid-email", next));
    }

    redirect(buildLoginRedirect("signup-failed", next));
  }

  // 2. Auto login tras registro exitoso
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    console.error("Auto sign-in failed:", signInError.message);
    redirect(buildLoginRedirect("signup-success-login-failed", next));
  }

  // 3. Redirigir a la app principal
  redirect(next);
}

function buildLoginRedirect(error: string, next: string) {
  const params = new URLSearchParams({ error, next });
  return `/login?${params.toString()}`;
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    throw new Error("Error cerrando sesión");
  }

  redirect("/login"); // O donde quieras llevarlo después
}

export async function sendFeedback(formData: FormData) {
  const supabase = await createClient();

  // Obtener el mensaje del formulario
  const message = formData.get("message") as string;

  // Obtener el usuario autenticado
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("No se pudo obtener el usuario:", userError);
    return;
  }

  // Insertar en la tabla feedback
  const { error: insertError } = await supabase.from("feedback").insert({
    message,
    user_id: user.id,
  });

  if (insertError) {
    console.error("Error al insertar feedback:", insertError);
  }
}
