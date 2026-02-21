"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { JobModel } from "@/models/Job";
import { revalidatePath } from "next/cache";

export async function createJobAction(formData, imageUrl) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const finalData = JobModel.formatForStorage(formData, user.id, imageUrl);
  const { error } = await supabase.from("jobs").insert([finalData]);

  if (error) throw error;

  revalidatePath("/");
  return { success: true };
}

export async function getJobById(id) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
}
