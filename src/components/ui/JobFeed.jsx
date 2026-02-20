"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { MapPin, Clock, Banknote, Calendar, Landmark } from "lucide-react";
import styles from "./JobFeed.module.css";

export default function JobFeed() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  useEffect(() => {
    async function fetchJobs() {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("posted", { ascending: false });

      if (!error) setJobs(data);
      setLoading(false);
    }
    fetchJobs();
  }, []);

  if (loading)
    return <div className={styles.loading}>Loading latest jobs...</div>;

  return (
    <div className={styles.feedGrid}>
      {jobs.map((job) => (
        <div key={job.id} className={styles.jobCard}>
          {job.image_url && (
            <div className={styles.imageWrapper}>
              <img
                src={job.image_url}
                alt={job.title}
                className={styles.jobImage}
              />
            </div>
          )}

          <div className={styles.cardContent}>
            <div className={styles.header}>
              <h3 className={styles.title}>{job.title}</h3>
              <span className={styles.badge}>{job.type}</span>
            </div>

            <p className={styles.companyName}>{job.company}</p>

            <div className={styles.detailsRow}>
              <div className={styles.detailItem}>
                <MapPin size={14} /> {job.location}
              </div>
              {job.salary && (
                <div className={styles.detailItem}>
                  <Banknote size={14} /> {job.salary}
                </div>
              )}
            </div>

            {job.landmark && (
              <div className={styles.landmark}>
                <Landmark size={14} /> Near {job.landmark}
              </div>
            )}

            <p className={styles.description}>
              {job.description?.substring(0, 100)}...
            </p>

            <div className={styles.cardFooter}>
              <span className={styles.date}>
                <Calendar size={12} />{" "}
                {new Date(job.posted).toLocaleDateString()}
              </span>
              <button className={styles.applyBtn}>View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
