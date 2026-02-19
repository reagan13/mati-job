import styles from "../layout/LeftActionPanel.module.css";

export default function ActionSection({ title, icon: Icon, children }) {
  return (
    <div className={styles.extraSection}>
      <span className={styles.sectionTitle}>
        {Icon && (
          <Icon
            size={16}
            style={{ marginRight: "8px", verticalAlign: "middle" }}
          />
        )}
        {title}
      </span>
      <ul className={styles.list}>{children}</ul>
    </div>
  );
}
