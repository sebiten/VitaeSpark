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

  console.log("Attempting signup with:", { name, email }); // Log attempt (don't log password)

  // 1. Intentar registro
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    if (error.status === 422 && error.code === "user_already_exists") {
      redirect("/login?error=user-already-exists");
    }

    // More specific error handling
    if (error.message?.includes("password")) {
      redirect("/login?error=invalid-password");
    }

    if (error.message?.includes("email")) {
      redirect("/login?error=invalid-email");
    }

    // Error genérico para otros casos
    redirect(
      `/login?error=signup-failed&message=${encodeURIComponent(
        error.message || "Unknown error"
      )}`
    );
  }

  console.log("Signup successful, session:", !!data?.session);

  // Try to sign in immediately
  try {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error("Auto sign-in failed:", signInError.message);
      redirect("/login?message=signup-success-login-failed");
    }

    // Success - redirect to dashboard
    redirect("/crear");
  } catch (signInError) {
    console.error("Auto sign-in exception:", signInError);

    // If email confirmation is required, show success message
    redirect("/crear");
  }
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
