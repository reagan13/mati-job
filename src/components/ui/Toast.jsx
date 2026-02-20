"use client";
import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import styles from "./Toast.module.css";

export default function Toast({ message, onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={styles.toast}>
      <CheckCircle2 size={20} className={styles.icon} />
      <span className={styles.message}>{message}</span>
      <button onClick={onClose} className={styles.closeBtn}>
        <X size={14} />
      </button>
    </div>
  );
}
