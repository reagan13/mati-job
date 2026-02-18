import styles from "./StatCard.module.css";

export default function StatCard({ title, value, trend, icon, color }) {
  return (
    <div className={styles.statCard}>
      <div className={`${styles.iconWrapper} ${styles[color]}`}>{icon}</div>
      <div className={styles.statInfo}>
        <p className={styles.statTitle}>{title}</p>
        <h3 className={styles.statValue}>{value}</h3>
        <span className={styles.statTrend}>{trend} this month</span>
      </div>
    </div>
  );
}
