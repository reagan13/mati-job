"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Banknote,
  Phone,
  Facebook,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import styles from "../layout/MainFeed.module.css";

export default function JobCard({ job }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const characterLimit = 160;
  const description = job.description || "";
  const isLong = description.length > characterLimit;

  const displayText = isExpanded
    ? description
    : description.slice(0, characterLimit);

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
        <p className={styles.descriptionText}>
          {displayText}
          {!isExpanded && isLong && (
            <span className={styles.ellipsis}>...</span>
          )}
        </p>

        {isLong && (
          <button
            className={`${styles.proReadMoreBtn} ${isExpanded ? styles.expanded : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp size={14} />
              </>
            ) : (
              <>
                Read Full Description <ChevronDown size={14} />
              </>
            )}
          </button>
        )}
      </div>

      {(job.contact_number || job.facebook_link) && (
        <div className={styles.contactContainer}>
          <span className={styles.contactLabel}>Direct Contact</span>
          <div className={styles.contactLinks}>
            {job.contact_number && (
              <a
                href={`tel:${job.contact_number}`}
                className={styles.contactBadge}
              >
                <Phone size={12} /> {job.contact_number}
              </a>
            )}
            {job.facebook_link && (
              <a
                href={job.facebook_link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactBadge}
              >
                <Facebook size={12} /> Facebook
              </a>
            )}
          </div>
        </div>
      )}

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
