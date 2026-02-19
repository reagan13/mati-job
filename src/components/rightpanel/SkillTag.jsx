import styles from "../layout/RightActionPanel.module.css";

export default function SkillTag({ label }) {
  return <span className={styles.tag}>{label}</span>;
}
