"use client";

import styles from "../layout/LeftActionPanel.module.css";

export default function IdentityCard({ profile, isClient }) {
  // Extract data from profile
  const firstName = profile?.full_name?.split(" ")[0] || "there";
  const role = profile?.role || "User";

  const jobMatchesCount = profile?.job_matches_count || 0;
  const proposalCount = profile?.proposals_count || 0;

  return (
    <div className={styles.identityCard}>
      <span className={styles.roleBadge}>{role}</span>
      <h2 style={{ margin: 0 }}>Hi, {firstName}!</h2>
      <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "8px" }}>
        {isClient
          ? "Ready to find the perfect professional for your next project?"
          : `You have ${jobMatchesCount} new job matches based on your skills.`}
      </p>

      <button className={styles.actionButton}>
        {isClient ? "Post a New Job" : `View My Proposals`}
      </button>
    </div>
  );
}
