import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import LeftActionPanel from "@/components/layout/LeftActionPanel";
import RightActionPanel from "@/components/layout/RightActionPanel";
import MainFeed from "@/components/layout/MainFeed";
import styles from "../home/Home.module.css";

export default async function SearchPage({ searchParams }) {
  const cookieStore = await cookies();
  const filters = (await searchParams) || {};

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

      <main className={styles.main}>
        {/* Left Panel remains consistent with Home */}
        <aside className={styles.leftSidebar}>
          <LeftActionPanel profile={profile} />
        </aside>

        <div className={styles.feedWrapper}>
          {/* MainFeed now receives the filters from the URL */}
          <MainFeed searchParams={filters} />
        </div>

        {/* Right Panel remains consistent with Home */}
        <aside className={styles.rightSidebar}>
          <RightActionPanel />
        </aside>
      </main>
    </>
  );
}
