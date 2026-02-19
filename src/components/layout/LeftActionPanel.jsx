import {
  User,
  Briefcase,
  Settings,
  LayoutDashboard,
  Bookmark,
  History,
  TrendingUp,
  CircleDot,
} from "lucide-react";
import styles from "./LeftActionPanel.module.css";

export default function LeftActionPanel({ profile }) {
  const isClient = profile?.role === "CLIENT";

  return (
    <div className={styles.container}>
      {/* 1. Identity Card */}
      <div className={styles.identityCard}>
        <span className={styles.roleBadge}>{profile?.role || "User"}</span>
        <h2 style={{ margin: 0 }}>
          Hi, {profile?.full_name?.split(" ")[0] || "there"}!
        </h2>
        <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "8px" }}>
          {isClient
            ? "Ready to find the perfect professional for your next project?"
            : "You have 4 new job matches based on your skills."}
        </p>
        <button className={styles.actionButton}>
          {isClient ? "Post a New Job" : "View My Proposals"}
        </button>
      </div>

      {/* 2. Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{isClient ? "2" : "12"}</span>
          <span className={styles.statLabel}>
            {isClient ? "Active Jobs" : "Applied"}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>4.9</span>
          <span className={styles.statLabel}>Rating</span>
        </div>
      </div>

      {/* 3. Recent Activity Section */}
      <div className={styles.extraSection}>
        <span className={styles.sectionTitle}>
          <History
            size={16}
            style={{ marginRight: "8px", verticalAlign: "middle" }}
          />
          Recent Activity
        </span>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <CircleDot size={10} color="#3b82f6" /> Applied for UI Designer
          </li>
          <li className={styles.listItem}>
            <CircleDot size={10} color="#cbd5e1" /> Viewed Backend Developer
          </li>
        </ul>
      </div>

      {/* 4. Profile Strength */}
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
          <span style={{ color: "#3b82f6", fontWeight: 700 }}>80%</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: "80%" }}></div>
        </div>
        <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "5px 0 0" }}>
          Complete your bio to stand out.
        </p>
      </div>

      {/* 5. Quick Links Section */}
      <div className={styles.extraSection}>
        <span className={styles.sectionTitle}>Quick Links</span>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <LayoutDashboard size={18} /> My Dashboard
          </li>
          <li className={styles.listItem}>
            <Bookmark size={18} /> Saved Jobs
          </li>
          <li className={styles.listItem}>
            <Settings size={18} /> Settings
          </li>
        </ul>
      </div>
    </div>
  );
}
