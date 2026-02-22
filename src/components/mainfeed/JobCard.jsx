"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Clock, Banknote, ChevronRight, Heart } from "lucide-react";
import styles from "../layout/MainFeed.module.css";

export default function JobCard({ job }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Defining this logic as a local constant inside the effect
    // removes the cascading render warning redline
    const checkSavedStatus = () => {
      if (typeof window !== "undefined") {
        const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
        const alreadySaved = savedJobs.some((j) => j.id === job.id);
        setIsSaved(alreadySaved);
      }
    };

    checkSavedStatus();
  }, [job.id]);

  const toggleSave = () => {
    if (typeof window === "undefined") return;

    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    let updatedJobs;

    if (isSaved) {
      updatedJobs = savedJobs.filter((j) => j.id !== job.id);
    } else {
      updatedJobs = [...savedJobs, job];
    }

    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
    setIsSaved(!isSaved);
    window.dispatchEvent(new Event("storage"));
  };

  const characterLimit = 160;
  const description = job.description || "";
  const isLong = description.length > characterLimit;
  const displayText = isLong
    ? description.slice(0, characterLimit) + "..."
    : description;

  return (
    <div className={styles.jobCard}>
      <div className={styles.jobHeader}>
        <div className={styles.logoPlaceholder} />
        <div className={styles.jobInfo}>
          <h4 className={styles.jobTitleText}>{job.title}</h4>
          <p className={styles.companyNameText}>{job.company}</p>
        </div>
        <span className={styles.postDate}>
          {new Date(job.posted).toLocaleDateString()}
        </span>
      </div>

      <div className={styles.descriptionWrapper}>
        <p className={styles.descriptionText}>{displayText}</p>
        {isLong && (
          <Link href={`/job/${job.id}`} className={styles.proReadMoreBtn}>
            Read Full Description <ChevronRight size={14} />
          </Link>
        )}
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <MapPin size={14} /> {job.location}
        </div>
        <div className={styles.detailItem}>
          <Clock size={14} /> {job.type}
        </div>
        <div className={styles.detailItem}>
          <Banknote size={14} /> {job.salary}
        </div>
      </div>

      <div className={styles.cardActions}>
        <button className={styles.applyBtn}>Apply Now</button>
        <button
          className={`${styles.saveBtn} ${isSaved ? styles.saved : ""}`}
          onClick={toggleSave}
        >
          <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
