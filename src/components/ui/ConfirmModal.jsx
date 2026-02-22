"use client";
import { AlertCircle, X } from "lucide-react";
import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  loading,
  confirmText = "Confirm", // Added default prop
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButtonWrapper}
          onClick={onClose}
          disabled={loading}
          aria-label="Close"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        <div className={styles.iconWrapper}>
          <AlertCircle size={48} className={styles.alertIcon} />
        </div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={styles.confirmBtn}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
