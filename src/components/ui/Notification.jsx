import { AlertCircle, Info, X } from "lucide-react";
import styles from "./Notification.module.css";

const Notification = ({ type = "error", title, message, onClose }) => {
  const config = {
    error: { icon: <AlertCircle size={18} />, className: styles.error },
    warning: { icon: <Info size={18} />, className: styles.warning },
  };

  const { icon, className } = config[type] || config.error;

  return (
    <div className={`${styles.toastContainer} ${className}`}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.content}>
        {title && <h4 className={styles.toastTitle}>{title}</h4>}
        <p className={styles.toastMessage}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="Close"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default Notification;
