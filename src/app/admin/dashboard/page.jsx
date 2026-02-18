"use client";

import React from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import StatCard from "@/components/admin/StatCard";
import DataListCard from "@/components/admin/DataListCard";
import AnalyticsChart from "@/components/admin/AnalyticsChart";
import Button from "@/components/ui/Button";
import {
  UserCheck,
  ShieldAlert,
  Zap,
  BarChart3,
  Search,
  Bell,
  SlidersHorizontal,
} from "lucide-react";
import styles from "./Dashboard.module.css";

export default function AdminDashboard() {
  const verificationData = [
    {
      label: "Student: Juan Dela Cruz",
      status: "Awaiting ID",
      type: "pending",
    },
    {
      label: "Business: TechCorp Inc.",
      status: "Awaiting Permit",
      type: "pending",
    },
    { label: "Student: Maria Santos", status: "Reviewing", type: "neutral" },
  ];

  const disputeData = [
    {
      label: "ID #402: Payment Issue",
      status: "Urgent",
      type: "urgent",
      icon: true,
    },
    { label: "ID #398: Incomplete Task", status: "Open", type: "neutral" },
    {
      label: "ID #405: Unauthorized Access",
      status: "Critical",
      type: "urgent",
      icon: true,
    },
  ];

  return (
    <div className={styles.dashboardLayout}>
      <AdminSidebar />

      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <div className={styles.headerTitle}>
            <h1>System Overview</h1>
            <p className={styles.subtitle}>
              Real-time monitoring and administrative control.
            </p>
          </div>

          <div className={styles.topActions}>
            <div className={styles.searchWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Quick search..."
                className={styles.searchInput}
              />
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.iconBtn}>
                <Bell size={20} />
                <span className={styles.notificationDot}></span>
              </button>
              <button className={styles.iconBtn}>
                <SlidersHorizontal size={20} />
              </button>
            </div>
            <div className={styles.avatar}>A</div>
          </div>
        </header>

        <section className={styles.statsGrid}>
          <StatCard
            title="Verifications"
            value="24"
            trend="+5"
            icon={<UserCheck />}
            color="blue"
          />
          <StatCard
            title="Safety Alerts"
            value="12"
            trend="High"
            icon={<ShieldAlert />}
            color="red"
          />
          <StatCard
            title="Engagement"
            value="890"
            trend="+12%"
            icon={<Zap />}
            color="yellow"
          />
          <StatCard
            title="Gross Revenue"
            value="₱45,200"
            trend="+8%"
            icon={<BarChart3 />}
            color="green"
          />
        </section>

        <section className={styles.chartSection}>
          <AnalyticsChart />
        </section>

        <div className={styles.managementHeader}>
          <h2>Action Required</h2>
          <Button variant="outline" size="small">
            Download Report
          </Button>
        </div>

        <section className={styles.managementGrid}>
          <DataListCard
            title="Verification Queue"
            action={<Button size="small">View Queue</Button>}
            data={verificationData}
          />
          <DataListCard
            title="System Disputes"
            action={
              <Button size="small" variant="secondary">
                Resolve All
              </Button>
            }
            data={disputeData}
          />
        </section>
      </main>
    </div>
  );
}
