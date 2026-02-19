"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import styles from "./Navbar.module.css";
import Button from "../ui/Button";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = ({ user: initialUser, profile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(initialUser);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [supabase]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/home" className={styles.logo} onClick={closeMenu}>
          MATI<span className={styles.logoDot}>JOB</span>
        </Link>

        {/* Desktop and Mobile Slide-out Links */}
        <nav className={`${styles.navLinks} ${isOpen ? styles.navActive : ""}`}>
          <Link href="/commission" className={styles.link} onClick={closeMenu}>
            Commission
          </Link>
          <Link href="/find-jobs" className={styles.link} onClick={closeMenu}>
            Jobs
          </Link>

          <div className={styles.mobileCta}>
            <Button href="/post-job" variant="primary" onClick={closeMenu}>
              Post a Job
            </Button>
            {!user && (
              <Button href="/login" variant="secondary" onClick={closeMenu}>
                Sign In
              </Button>
            )}
          </div>
        </nav>

        {/* Actions Area: User Icon and Hamburger Toggle */}
        <div className={styles.ctaWrapper}>
          <div className={styles.desktopCta}>
            <Button href="/post-job" variant="primary">
              Post a Job
            </Button>
            {!user && (
              <Button href="/login" variant="secondary">
                Sign In
              </Button>
            )}
          </div>

          {/* User Icon: Stays visible and sits left of hamburger on mobile */}
          {user && (
            <div className={styles.userSection}>
              <ProfileDropdown user={user} profile={profile} />
            </div>
          )}

          <button
            className={styles.menuToggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isOpen && <div className={styles.overlay} onClick={closeMenu} />}
    </header>
  );
};

export default Navbar;
