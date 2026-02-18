import React from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";
import styles from "./DataListCard.module.css";

export default function DataListCard({ title, action, data }) {
  return (
    <div className={styles.dataCard}>
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
        {/* Render the Button component passed via the action prop */}
        <div className={styles.headerAction}>{action}</div>
      </div>

      <div className={styles.tableList}>
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`${styles.tableItem} ${
              item.type === "urgent" ? styles.highPriority : ""
            }`}
          >
            <span className={styles.itemLabel}>
              {item.icon && (
                <AlertTriangle size={14} className={styles.warningIcon} />
              )}
              {item.label}
            </span>
            <div className={styles.itemMeta}>
              <span
                className={
                  styles[
                    `badge${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`
                  ]
                }
              >
                {item.status}
              </span>
              <ChevronRight size={16} className={styles.arrow} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
