"use server";

import { supabase } from "@/lib/supabase";
import { UserProfileModel } from "@/models/users";

export async function signUpUser(formData) {
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
  return { success: "Account created! Please verify your email." };
}
