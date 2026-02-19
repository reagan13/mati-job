import styles from "../layout/LeftActionPanel.module.css";

export default function StatCard({ number, label }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statNumber}>{number}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}
