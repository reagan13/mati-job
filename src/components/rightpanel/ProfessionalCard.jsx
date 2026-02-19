import styles from "../layout/RightActionPanel.module.css";

export default function ProfessionalCard({ name, role }) {
  return (
    <div className={styles.userItem}>
      <div className={styles.avatarPlaceholder} />
      <div className={styles.userInfo}>
        <span className={styles.userName}>{name}</span>
        <span className={styles.userRole}>{role}</span>
      </div>
    </div>
  );
}
