"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowLeft, Trash2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobCard from "@/components/mainfeed/JobCard";
import ConfirmModal from "@/components/ui/ConfirmModal";
import styles from "./SavedJobs.module.css";

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = () => {
      if (typeof window !== "undefined") {
        const jobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
        setSavedJobs(jobs);
      }
    };

    fetchJobs();

    window.addEventListener("storage", fetchJobs);
    return () => window.removeEventListener("storage", fetchJobs);
  }, []);

  // Define the function that the modal will call
  const handleClearAll = () => {
    localStorage.setItem("savedJobs", JSON.stringify([]));
    setSavedJobs([]);
    window.dispatchEvent(new Event("storage"));
    setIsModalOpen(false); // Close the modal after action
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.container}>
        <header className={styles.headerSection}>
          <div className={styles.headerLeft}>
            <Link href="/home" className={styles.backBtn}>
              <ArrowLeft size={16} /> Back to Browse
            </Link>
            <h1 className={styles.title}>Saved Opportunities</h1>
            <p className={styles.subtitle}>
              You have <strong>{savedJobs.length}</strong> jobs curated in your
              list.
            </p>
          </div>
          {savedJobs.length > 0 && (
            <button
              onClick={() => setIsModalOpen(true)} // Opens the modal
              className={styles.clearBtn}
            >
              <Trash2 size={16} /> Clear list
            </button>
          )}
        </header>

        <section className={styles.contentArea}>
          {savedJobs.length > 0 ? (
            <div className={styles.jobsGrid}>
              {savedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.iconCircle}>
                <Heart size={40} className={styles.emptyIcon} />
              </div>
              <h2>No saved jobs yet</h2>
              <p>Explore the feed and save jobs that match your expertise.</p>
              <Link href="/home" className={styles.browseBtn}>
                Start Exploring
              </Link>
            </div>
          )}
        </section>
      </main>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleClearAll} // Fixed the ReferenceError
        title="Clear All Saved Jobs?"
        message="Are you sure you want to remove all items from your saved list? This action cannot be undone."
        confirmText="Clear All"
      />

      <Footer />
    </div>
  );
}
