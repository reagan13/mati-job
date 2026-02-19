import { Users, TrendingUp, Zap, Award } from "lucide-react";
import styles from "./RightActionPanel.module.css";

export default function RightActionPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>
          <Users size={18} className={styles.icon} /> Top Professionals
        </h3>
        <div className={styles.userList}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.userItem}>
              <div className={styles.avatarPlaceholder} />
              <div className={styles.userInfo}>
                <span className={styles.userName}>Alex Johnson</span>
                <span className={styles.userRole}>UI/UX Designer</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>
          <TrendingUp size={18} className={styles.icon} /> Trending Skills
        </h3>
        <div className={styles.tagCloud}>
          {["React", "Next.js", "Tailwind", "Figma", "Supabase"].map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.promoCard}>
        <Award size={32} className={styles.promoIcon} />
        <h4>Get Pro Access</h4>
        <p>See who viewed your profile and stand out to clients.</p>
        <button className={styles.promoButton}>Upgrade Now</button>
      </div>
    </div>
  );
}
