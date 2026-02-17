"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Notification from "@/components/ui/Notification";
import Button from "@/components/ui/Button";
import styles from "./login.module.css";

const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const MAX_ATTEMPTS = 5;
  const LOCKOUT_MS = 5 * 60 * 1000; // 5 Minutes
  const DEFAULT_ADMIN = { email: "admin@mati.com", password: "password123" };

  useEffect(() => {
    if (!lockoutUntil) return;
    const timer = setInterval(() => {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockoutUntil(null);
        setAttempts(0);
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
      router.push("/dashboard");
    } else {
      const nextCount = attempts + 1;
      setAttempts(nextCount);
      if (nextCount >= MAX_ATTEMPTS) {
        setLockoutUntil(Date.now() + LOCKOUT_MS);
      }
    }
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <main className={styles.loginPage}>
      {/* Toast Notification at bottom-right */}
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
          message={`Invalid credentials. ${MAX_ATTEMPTS - attempts} attempts remaining.`}
        />
      ) : null}

      <div className={styles.welcomeSide}>{/* Branding content here */}</div>

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
};

export default AdminLogin; // Final default export fix
