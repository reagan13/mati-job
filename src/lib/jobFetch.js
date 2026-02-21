import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client once
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
    // Search in both title and company
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

  // Handle salary range filtering if needed
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
    console.error("Error fetching jobs:", error);
    return [];
  }
  return data;
}

export async function getUniqueLocations() {
  const { data, error } = await supabase.from("jobs").select("location");

  if (error || !data) {
    console.error("Error fetching locations:", error);
    return [];
  }

  const unique = [...new Set(data.map((item) => item.location))].filter(
    Boolean,
  );

  // Format for the CustomSelect component
  return unique.map((loc) => ({ label: loc, value: loc }));
}
