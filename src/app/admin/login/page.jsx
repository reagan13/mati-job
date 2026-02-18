"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, BarChart3, ShieldCheck } from "lucide-react";
import Notification from "@/components/ui/Notification";
import Button from "@/components/ui/Button";
import styles from "./login.module.css";

export default function AdminLogin() {
  const router = useRouter();
  const hasHydrated = useRef(false);

  // 1. All States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);

  const MAX_ATTEMPTS = 5;
  const LOCKOUT_MS = 300000; // 5 Minutes
  const DEFAULT_ADMIN = { email: "admin@mati.com", password: "password123" };

  // 2. Hydrate lockout state from localStorage on mount (once only)
  useEffect(() => {
    if (hasHydrated.current) return;
    hasHydrated.current = true;

    const saved = localStorage.getItem("admin_lockout_until");
    if (saved) {
      const expirationTime = parseInt(saved, 10);
      if (expirationTime > Date.now()) {
        // Safe: one-time initialization from storage after mount
        // eslint-disable react-hooks/rules-of-hooks
        setLockoutUntil(expirationTime);
      } else {
        localStorage.removeItem("admin_lockout_until");
      }
    }
  }, []);

  // 3. Countdown Timer
  useEffect(() => {
    if (!lockoutUntil) return;

    const timer = setInterval(() => {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockoutUntil(null);
        setAttempts(0);
        localStorage.removeItem("admin_lockout_until");
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutUntil]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lockoutUntil) return;

    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      localStorage.removeItem("admin_lockout_until");
      router.push("/dashboard");
    } else {
      const nextCount = attempts + 1;
      setAttempts(nextCount);
      if (nextCount >= MAX_ATTEMPTS) {
        const expiry = Date.now() + LOCKOUT_MS;
        setLockoutUntil(expiry);
        localStorage.setItem("admin_lockout_until", expiry.toString());
      }
    }
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <main className={styles.loginPage}>
      {lockoutUntil ? (
        <Notification
          type="error"
          title="Security Lockout"
          message={`Too many failed attempts. Try again in ${formatTime(timeLeft)}.`}
        />
      ) : attempts > 0 ? (
        <Notification
          type="warning"
          title="Login Failed"
          message={`Invalid credentials. ${MAX_ATTEMPTS - attempts} attempts left.`}
        />
      ) : null}

      <div className={styles.welcomeSide}>
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeLogo}>
            Mati<span>.</span>Admin
          </h1>
          <p className={styles.welcomeTagline}>
            Professional dashboard management.
          </p>
        </div>
      </div>

      <div className={styles.formSide}>
        <div className={styles.loginCard}>
          <header className={styles.header}>
            <h1 className={styles.logo}>
              Sign in to <span>Mati.Admin</span>
            </h1>
          </header>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.floatingGroup}>
              <input
                type="email"
                className={styles.floatingInput}
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!lockoutUntil}
                required
              />
              <label className={styles.floatingLabel}>Work Email</label>
            </div>

            <div className={styles.floatingGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`${styles.floatingInput} ${styles.passwordInput}`}
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!!lockoutUntil}
                  required
                />
                <label className={styles.floatingLabel}>Password</label>
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={!!lockoutUntil}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={!!lockoutUntil}>
              {lockoutUntil ? `Locked (${formatTime(timeLeft)})` : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
