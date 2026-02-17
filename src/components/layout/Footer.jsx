import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Send,
  ArrowRight,
} from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandSide}>
          <h2 className={styles.logo}>
            Mati<span>.</span>
          </h2>
          <p className={styles.description}>
            The leading marketplace for modern careers. Connecting premium
            Filipino talent with the world&apos;s most innovative companies.
          </p>
          <div className={styles.socials}>
            <a href="#">
              <Facebook size={20} />
            </a>
            <a href="#">
              <Twitter size={20} />
            </a>
            <a href="#">
              <Linkedin size={20} />
            </a>
            <a href="#">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.column}>
            <h3>Platform</h3>
            <a href="#">Find Jobs</a>
            <a href="#">Post a Job</a>
            <a href="#">How it Works</a>
            <a href="#">Pricing</a>
          </div>
          <div className={styles.column}>
            <h3>Company</h3>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>
          <div className={styles.newsletter}>
            <h3>Stay Updated</h3>
            <p>Get the latest job openings in your inbox.</p>
            <div className={styles.inputWrapper}>
              <input type="email" placeholder="Email address" />
              <button>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>© {currentYear} Mati. Built for the future of work.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
