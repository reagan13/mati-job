"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Check, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import styles from "./Signup.module.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const validations = {
    length: formData.password.length >= 8,
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*]/.test(formData.password),
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(validations).every(Boolean)) {
      console.log("Account created:", formData.email);
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>
              Join MATI<span className={styles.logoDot}>JOB</span>
            </h1>
            <p>Create an account to start applying or posting jobs.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@company.com"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                {isFocused && (
                  <div className={styles.validationModal}>
                    <p
                      className={
                        validations.length ? styles.valid : styles.invalid
                      }
                    >
                      {validations.length ? (
                        <Check size={14} />
                      ) : (
                        <X size={14} />
                      )}{" "}
                      8+ characters
                    </p>
                    <p
                      className={
                        validations.number ? styles.valid : styles.invalid
                      }
                    >
                      {validations.number ? (
                        <Check size={14} />
                      ) : (
                        <X size={14} />
                      )}{" "}
                      1 number
                    </p>
                    <p
                      className={
                        validations.special ? styles.valid : styles.invalid
                      }
                    >
                      {validations.special ? (
                        <Check size={14} />
                      ) : (
                        <X size={14} />
                      )}{" "}
                      1 special char
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="primary"
              type="submit"
              className={styles.submitBtn}
            >
              CREATE ACCOUNT
            </Button>
          </form>

          <div className={styles.footer}>
            <p>
              Already have an account? <Link href="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
