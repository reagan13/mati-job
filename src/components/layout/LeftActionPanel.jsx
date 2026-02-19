import {
  History,
  CircleDot,
  LayoutDashboard,
  Bookmark,
  Settings,
} from "lucide-react";
import styles from "./LeftActionPanel.module.css";
import IdentityCard from "../leftpanel/IdentityCard";
import StatCard from "../leftpanel/StatCard";
import ProfileStrength from "../leftpanel/ProfileStrength";
import ActionSection from "../leftpanel/ActionSection";

export default function LeftActionPanel({ profile }) {
  const isClient = profile?.role === "CLIENT";

  return (
    <div className={styles.container}>
      <IdentityCard profile={profile} isClient={isClient} />

      <div className={styles.statsGrid}>
        <StatCard
          number={isClient ? "2" : "12"}
          label={isClient ? "Active Jobs" : "Applied"}
        />
        <StatCard number="4.9" label="Rating" />
      </div>

      <ActionSection title="Recent Activity" icon={History}>
        <li className={styles.listItem}>
          <CircleDot size={10} color="#3b82f6" /> Applied for UI Designer
        </li>
        <li className={styles.listItem}>
          <CircleDot size={10} color="#cbd5e1" /> Viewed Backend Developer
        </li>
      </ActionSection>

      <ProfileStrength percentage={80} />

      <ActionSection title="Quick Links">
        <li className={styles.listItem}>
          <LayoutDashboard size={18} /> My Dashboard
        </li>
        <li className={styles.listItem}>
          <Bookmark size={18} /> Saved Jobs
        </li>
        <li className={styles.listItem}>
          <Settings size={18} /> Settings
        </li>
      </ActionSection>
    </div>
  );
}
