import { MapPin, Clock, Banknote } from "lucide-react";
import styles from "../layout/MainFeed.module.css";

export default function JobCard({ job }) {
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

      {/* Large Attached Image Container */}
      {job.image_url && (
        <div className={styles.postImageContainer}>
          <img
            src={job.image_url}
            alt="Hiring Visual"
            className={styles.fullWidthPostImage}
          />
        </div>
      )}

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
        <button className={styles.saveBtn}>Save</button>
      </div>
    </div>
  );
}
