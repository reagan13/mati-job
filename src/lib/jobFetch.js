import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export async function getJobs(filters = {}) {
  let query = supabase
    .from("jobs")
    .select("*")
    .order("posted", { ascending: false });

  if (filters.query) {
    query = query.or(
      `title.ilike.%${filters.query}%,company.ilike.%${filters.query}%`,
    );
  }

  if (filters.location) {
    query = query.eq("location", filters.location);
  }

  if (filters.type) {
    query = query.eq("type", filters.type);
  }

  if (filters.salary) {
    if (filters.salary === "40plus") {
      query = query.gte("salary_min", 40000);
    } else {
      const [min, max] = filters.salary.split("-");
      query = query
        .gte("salary_min", parseInt(min) * 1000)
        .lte("salary_max", parseInt(max) * 1000);
    }
  }

  const { data, error } = await query;
  if (error) {
    console.error("Supabase Error:", error.message);
    return [];
  }
  return data;
}

export async function getUniqueLocations() {
  const { data, error } = await supabase.from("jobs").select("location");
  if (error || !data) return [];
  const unique = [...new Set(data.map((item) => item.location))].filter(
    Boolean,
  );
  return unique.map((loc) => ({ label: loc, value: loc }));
}
