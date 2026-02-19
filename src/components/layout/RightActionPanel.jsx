import { Users, TrendingUp } from "lucide-react";
import styles from "./RightActionPanel.module.css";

// Import sub-components
import ProfessionalCard from "../rightpanel/ProfessionalCard";
import SkillTag from "../rightpanel/SkillTag";
import PromoCard from "../rightpanel/PromoCard";

export default function RightActionPanel() {
  const trendingSkills = ["React", "Next.js", "Tailwind", "Figma", "Supabase"];

  const topProfessionals = [
    { id: 1, name: "Alex Johnson", role: "UI/UX Designer" },
    { id: 2, name: "Sarah Chen", role: "Frontend Developer" },
    { id: 3, name: "Mike Ross", role: "Backend Architect" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>
          <Users size={18} className={styles.icon} /> Top Professionals
        </h3>
        <div className={styles.userList}>
          {topProfessionals.map((pro) => (
            <ProfessionalCard key={pro.id} name={pro.name} role={pro.role} />
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>
          <TrendingUp size={18} className={styles.icon} /> Trending Skills
        </h3>
        <div className={styles.tagCloud}>
          {trendingSkills.map((tag) => (
            <SkillTag key={tag} label={tag} />
          ))}
        </div>
      </div>

      <PromoCard />
    </div>
  );
}
