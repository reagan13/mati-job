import PostJobForm from "@/components/ui/PostJobForm";
import Navbar from "@/components/layout/Navbar";
import styles from "./PostJobPage.module.css";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Footer from "@/components/layout/Footer";

export default async function PostJobPage() {
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

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <>
      <Navbar user={user} profile={profile} />
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>Create a Job Listing</h1>
            <p>Fill out the details below to find your next great hire.</p>
          </header>
          <PostJobForm userProfile={profile} />
        </div>
      </main>
      <Footer />
    </>
  );
}
