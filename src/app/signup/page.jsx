"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Check, X, Briefcase, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import styles from "./Signup.module.css";
import { signUpUser } from "../actions/auth";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const validations = {
    length: formData.password.length >= 8,
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*]/.test(formData.password),
    match:
      formData.password === formData.confirmPassword &&
      formData.confirmPassword !== "",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setRole = (role) => setFormData({ ...formData, role });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(validations).every(Boolean)) return;

    setLoading(true);
    const data = new FormData(e.target);
    data.append("role", formData.role); // Manually append the state role

    const result = await signUpUser(data);
    if (result.error) setMessage({ type: "error", text: result.error });
    else setMessage({ type: "success", text: result.success });
    setLoading(false);
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
            {/* Role Selection */}
            <div className={styles.roleContainer}>
              <div
                className={`${styles.roleCard} ${formData.role === "applicant" ? styles.activeRole : ""}`}
                onClick={() => setRole("applicant")}
              >
                <User size={20} />
                <span>Applicant</span>
              </div>
              <div
                className={`${styles.roleCard} ${formData.role === "client" ? styles.activeRole : ""}`}
                onClick={() => setRole("client")}
              >
                <Briefcase size={20} />
                <span>Client</span>
              </div>
            </div>

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
                type="text"
                name="fullName"
                placeholder=" "
                className={styles.inputField}
                onChange={handleChange}
                required
              />
              <label className={styles.floatingLabel}>Full Name</label>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder=" "
                className={styles.inputField}
                onChange={handleChange}
                required
              />
              <label className={styles.floatingLabel}>Email Address</label>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder=" "
                  className={styles.inputField}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                />
                <label className={styles.floatingLabel}>Password</label>
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
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

            <div className={styles.inputGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder=" "
                  className={styles.inputField}
                  onChange={handleChange}
                  required
                />
                <label className={styles.floatingLabel}>Confirm Password</label>
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirmPassword && (
                <p
                  className={
                    validations.match ? styles.validText : styles.invalidText
                  }
                >
                  {validations.match
                    ? "✓ Passwords match"
                    : "✕ Passwords do not match"}
                </p>
              )}
            </div>

            <Button
              variant="primary"
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "PROCESSING..." : "CREATE ACCOUNT"}
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
