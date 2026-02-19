"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Helper function to create the supabase client with cookie support
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
          } catch {
            // This can be ignored if the middleware handles refreshes
          }
        },
      },
    },
  );
}

export async function signUpUser(formData) {
  const supabase = await getSupabaseClient();

  // Assuming UserProfileModel extracts data from formData
  const email = formData.get("email");
  const password = formData.get("password");
  const fullName = formData.get("full_name"); // Adjust based on your model
  const role = formData.get("role");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role,
      },
    },
  });

  if (error) return { error: error.message };
  return { success: "Account created! Please verify your email." };
}

export async function signInUser(formData) {
  const supabase = await getSupabaseClient();
  const email = formData.get("email");
  const password = formData.get("password");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };

  return { success: "Login successful! Redirecting..." };
}
