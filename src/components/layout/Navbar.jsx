"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";
import Button from "../ui/Button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
          <Link href="/companies" className={styles.link} onClick={closeMenu}>
            Companies
          </Link>
          <Link href="/salaries" className={styles.link} onClick={closeMenu}>
            Salaries
          </Link>

          <div className={styles.mobileCta}>
            <Button href="/signup" variant="secondary" onClick={closeMenu}>
              Sign In
            </Button>
            <Button href="/post-job" variant="primary" onClick={closeMenu}>
              Post a Job
            </Button>
          </div>
        </nav>

        <div className={styles.ctaWrapper}>
          <div className={styles.desktopCta}>
            <Button href="/signup" variant="secondary">
              Sign In
            </Button>
            <Button href="/post-job" variant="primary">
              Post a Job
            </Button>
          </div>

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
