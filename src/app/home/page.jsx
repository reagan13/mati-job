import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchFilter from "@/components/sections/SearchFilter";
import LeftActionPanel from "@/components/layout/LeftActionPanel";

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
      <Navbar user={user} profile={profile} />

      <main
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          paddingTop: "70px", // Height of your navbar
          display: "flex",
        }}
      >
        {/* LEFT SIDEBAR SECTION */}
        <aside
          style={{
            width: "350px",
            backgroundColor: "transparent",
            padding: "2rem 1.5rem",
            height: "calc(100vh - 70px)", // Fill remaining height
            position: "fixed", // Keep it pinned while scrolling the right side
            left: 0,
            overflowY: "auto",
          }}
        >
          <LeftActionPanel profile={profile} />
        </aside>

        {/* RIGHT CONTENT SECTION */}
        <section
          style={{
            flex: 1,
            marginLeft: "350px", // Matches sidebar width
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "24px",
              border: "1px solid #e2e8f0",
              maxWidth: "1000px", // Optional: keep the search bar from stretching too wide
            }}
          >
            <h1
              style={{
                fontSize: "1.8rem",
                fontWeight: "800",
                marginBottom: "1.2rem",
                color: "#0f172a",
              }}
            >
              Find your next{" "}
              <span style={{ color: "#3b82f6" }}>opportunity.</span>
            </h1>
            <SearchFilter />
          </div>

          <div
            style={{
              minHeight: "400px",
              padding: "2rem",
              background: "white",
              borderRadius: "24px",
              border: "1px solid #e2e8f0",
              maxWidth: "1000px",
            }}
          >
            <h3 style={{ marginBottom: "1.5rem" }}>Recommended for you</h3>
            <div
              style={{
                padding: "60px",
                textAlign: "center",
                color: "#94a3b8",
                border: "2px dashed #f1f5f9",
                borderRadius: "16px",
              }}
            >
              We&apos;re tailoring the best matches for your profile...
            </div>
          </div>
        </section>
      </main>
      {/* Remove footer if you want a true full-screen dashboard feel, or keep it inside the section */}
    </>
  );
}
