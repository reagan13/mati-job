import { TrendingUp } from "lucide-react";
import styles from "../layout/LeftActionPanel.module.css";

export default function ProfileStrength({ percentage = 80 }) {
  return (
    <div className={styles.progressContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.85rem",
        }}
      >
        <span style={{ fontWeight: 600 }}>
          <TrendingUp
            size={14}
            style={{ marginRight: "4px", verticalAlign: "middle" }}
          />
          Profile Strength
        </span>
        <span style={{ color: "#3b82f6", fontWeight: 700 }}>{percentage}%</span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "5px 0 0" }}>
        Complete your bio to stand out.
      </p>
    </div>
  );
}
