"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import styles from "./Login.module.css";
import { signInUser } from "../actions/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const data = new FormData(e.target);
    const result = await signInUser(data);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
      setLoading(false);
    } else {
      setMessage({ type: "success", text: result.success });
      router.refresh();
      setTimeout(() => {
        router.push("/home");
      }, 1500);
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>
              Welcome Back to MATI<span className={styles.logoDot}>JOB</span>
            </h1>
            <p>Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {message.text && (
              <p
                className={
                  message.type === "error"
                    ? styles.invalidText
                    : styles.validText
                }
              >
                {message.text}
              </p>
            )}

            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder=" "
                className={styles.inputField}
                required
              />
              <label className={styles.floatingLabel}>Email Address</label>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=" "
                  className={styles.inputField}
                  required
                />
                <label className={styles.floatingLabel}>Password</label>
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Link href="/forgot-password" className={styles.forgotPass}>
              Forgot password?
            </Link>

            <Button
              variant="primary"
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
          </form>

          <div className={styles.footer}>
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/signup" style={{ fontWeight: "700", color: "#000" }}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
