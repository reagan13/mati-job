import { Award } from "lucide-react";
import styles from "../layout/RightActionPanel.module.css";

export default function PromoCard() {
  return (
    <div className={styles.promoCard}>
      <Award size={32} className={styles.promoIcon} />
      <h4>Get Pro Access</h4>
      <p>See who viewed your profile and stand out to clients.</p>
      <button className={styles.promoButton}>Upgrade Now</button>
    </div>
  );
}
