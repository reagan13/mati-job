"use client";
import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  DollarSign,
  Code,
  PenTool,
  Headphones,
  Layout,
  Globe,
} from "lucide-react";
import styles from "./Featured.module.css";
import Button from "../ui/Button";

const JOBS_DATA = [
  {
    id: 1,
    category: "Finance",
    icon: <DollarSign size={14} />,
    title: "Financial Analyst",
    location: "San Diego, CA",
    type: "Full Time",
    date: "June 8",
    company: "ER Mall",
    logoBg: "#0f172a",
  },
  {
    id: 2,
    category: "Dev",
    icon: <Code size={14} />,
    title: "Fullstack Dev",
    location: "San Diego, CA",
    type: "Intern",
    date: "June 8",
    company: "Warehouse",
    logoBg: "#3b82f6",
  },
  {
    id: 3,
    category: "Writing",
    icon: <PenTool size={14} />,
    title: "Technical Writer",
    location: "LA, CA",
    type: "Remote",
    date: "June 7",
    company: "Client",
    logoBg: "#e11d48",
  },
  {
    id: 4,
    category: "Support",
    icon: <Headphones size={14} />,
    title: "Support Engineer",
    location: "SF, CA",
    type: "Full Time",
    date: "June 7",
    company: "NGO",
    logoBg: "#475569",
  },
  {
    id: 5,
    category: "Admin",
    icon: <Briefcase size={14} />,
    title: "Project Coord.",
    location: "San Diego, CA",
    type: "Full Time",
    date: "June 7",
    company: "Mati",
    logoBg: "#f97316",
  },
  {
    id: 6,
    category: "Design",
    icon: <Layout size={14} />,
    title: "UI Designer",
    location: "SF, CA",
    type: "Full Time",
    date: "June 7",
    company: "Provincial Office",
    logoBg: "#ea580c",
  },
  {
    id: 7,
    category: "Marketing",
    icon: <Globe size={14} />,
    title: "SEO Specialist",
    location: "Remote",
    type: "Part Time",
    date: "June 6",
    company: "City Hall",
    logoBg: "#10b981",
  },
  {
    id: 8,
    category: "Security",
    icon: <Code size={14} />,
    title: "Security Lead",
    location: "NY, NY",
    type: "Full Time",
    date: "June 6",
    company: "Mati",
    logoBg: "#6366f1",
  },
];

const Featured = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleJobs = showAll ? JOBS_DATA : JOBS_DATA;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Jobs</h2>
          <p className={styles.subtitle}>
            Explore opportunities from top companies.
          </p>
          <div className={styles.desktopBtn}>
            <Button href="/find-jobs">Browse All Jobs</Button>
          </div>
        </div>

        <div
          className={`${styles.grid} ${showAll ? styles.expanded : styles.collapsed}`}
        >
          {JOBS_DATA.map((job, index) => (
            <div
              key={job.id}
              className={`${styles.card} ${index >= 3 ? styles.extraJob : ""}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className={styles.cardTop}>
                <div className={styles.categoryBadge}>
                  <span className={styles.categoryIcon}>{job.icon}</span>
                  {job.category}
                </div>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <div className={styles.metaInfo}>
                  <div className={styles.metaItem}>
                    <MapPin size={12} /> {job.location}
                  </div>
                  <div className={styles.metaItem}>
                    <Clock size={12} /> {job.type}
                  </div>
                </div>
              </div>

              <div className={styles.cardBottom}>
                <div className={styles.companyMeta}>
                  <span className={styles.postDate}>{job.date} by</span>
                  <span className={styles.companyName}>{job.company}</span>
                </div>
                <div
                  className={styles.brandLogo}
                  style={{ backgroundColor: job.logoBg }}
                >
                  <Briefcase size={20} color="white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className={styles.mobileBtnWrapper}>
            <Button> See All Jobs</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Featured;
