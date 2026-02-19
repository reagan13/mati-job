"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import styles from "./Navbar.module.css";
import Button from "../ui/Button";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          MATI<span className={styles.logoDot}>JOB</span>
        </Link>

        <nav className={`${styles.navLinks} ${isOpen ? styles.navActive : ""}`}>
          <Link href="/commission" className={styles.link} onClick={closeMenu}>
            Commission
          </Link>
          <Link href="/find-jobs" className={styles.link} onClick={closeMenu}>
            Jobs
          </Link>
        </nav>

        <div className={styles.ctaWrapper}>
          <div className={styles.desktopCta}>
            <Button href="/post-job" variant="primary">
              Post a Job
            </Button>
            {!user ? (
              <Button href="/login" variant="secondary">
                Sign In
              </Button>
            ) : (
              <ProfileDropdown user={user} />
            )}
          </div>

          <button
            className={styles.menuToggle}
            onClick={() => setIsOpen(!isOpen)}
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
