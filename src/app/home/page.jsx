import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function Home() {
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
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <>
      <Navbar />
      <main
        style={{
          padding: "4rem 2rem",
          minHeight: "80vh",
          background: "#fdfdfd",
        }}
      >
        <div
          style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}
        >
          <h1>Welcome to MATIJOB</h1>
          <p>
            Logged in as: <strong>{user.email}</strong>
          </p>
          <div
            style={{
              marginTop: "2rem",
              padding: "2rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h3>User Profile</h3>
            <p>Name: {profile?.full_name || "New User"}</p>
            <p>
              Role:{" "}
              <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                {profile?.role || "Not Set"}
              </span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
