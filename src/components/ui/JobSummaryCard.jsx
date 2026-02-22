import React from "react";
import { MapPin, Briefcase, Banknote, Phone, Facebook } from "lucide-react";
import styles from "./JobSummaryCard.module.css";
import Button from "./Button";

const JobSummaryCard = ({ job }) => {
  const items = [
    { icon: <MapPin size={20} />, label: "Location", value: job.location },
    { icon: <Briefcase size={20} />, label: "Job Type", value: job.type },
    {
      icon: <Banknote size={20} />,
      label: "Salary",
      value: job.salary || "Not Specified",
    },
    { icon: <Phone size={20} />, label: "Phone", value: job.contact_number },
  ];

  return (
    <aside className={styles.summaryCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>Job Summary</h3>
      </div>

      <div className={styles.grid}>
        {items.map(
          (item, index) =>
            item.value && (
              <div key={index} className={styles.infoBox}>
                <div className={styles.iconWrapper}>{item.icon}</div>
                <div>
                  <span className={styles.label}>{item.label}</span>
                  <p className={styles.value}>{item.value}</p>
                </div>
              </div>
            ),
        )}
      </div>

      <div className={styles.actions}>
        <Button className={styles.applyBtn}>Apply for this position</Button>

        {job.facebook_url && (
          <a
            href={job.facebook_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fbLink}
          >
            <Facebook size={18} />
            <span>Message on Facebook</span>
          </a>
        )}
      </div>
    </aside>
  );
};

export default JobSummaryCard;
