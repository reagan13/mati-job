"use client";

import React from "react";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  FolderTree,
  MessageSquare,
  FileText,
  Trophy,
  Settings,
  LogOut,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const menuItems = [
  { icon: <LayoutDashboard size={20} />, label: "Overview", active: true },
  { icon: <Users size={20} />, label: "Verifications" },
  { icon: <ShieldCheck size={20} />, label: "Job Moderation" },
  { icon: <FolderTree size={20} />, label: "Categories" },
  { icon: <MessageSquare size={20} />, label: "Disputes" },
  { icon: <FileText size={20} />, label: "System Content" },
  { icon: <Trophy size={20} />, label: "Gamification" },
  { icon: <Settings size={20} />, label: "Settings" },
];

export default function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <div className={styles.logoIcon}>M</div>
        <div className={styles.logoText}>
          Mati<span>.</span>Admin
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navSection}>
          <p className={styles.sectionLabel}>Main Menu</p>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`${styles.navItem} ${item.active ? styles.active : ""}`}
              style={{ "--index": index }} /* For staggered animation */
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
              {item.active && <div className={styles.activeIndicator} />}
            </button>
          ))}
        </div>
      </nav>

      <div className={styles.sidebarFooter}>
        <button className={styles.logoutButton}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
