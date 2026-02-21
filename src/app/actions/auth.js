"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { UserProfileModel } from "@/models/users";
import { redirect } from "next/navigation";

async function getSupabaseClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  );
}

export async function signUpUser(formData) {
  const supabase = await getSupabaseClient();
  const userModel = UserProfileModel(formData);
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signUp({
    email: userModel.email,
    password,
    options: {
      data: {
        full_name: userModel.fullName,
        role: userModel.role,
      },
    },
  });

  if (error) return { error: error.message };
  return { success: "Check your email to verify your account!" };
}

export async function signInUser(formData) {
  const supabase = await getSupabaseClient();
  const email = formData.get("email");
  const password = formData.get("password");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };
  return { success: "Login success!" };
}

export async function signOutUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );

  await supabase.auth.signOut();
  redirect("/login");
}
