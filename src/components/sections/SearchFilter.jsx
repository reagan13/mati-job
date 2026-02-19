"use client";
import { Search, MapPin, Briefcase, Banknote, Clock } from "lucide-react";
import styles from "./SearchFilter.module.css";
import CustomSelect from "../ui/CustomSelect";

const SearchFilter = () => {
  const townOptions = [
    { label: "Mati City", value: "mati" },
    { label: "Dahican", value: "dahican" },
    { label: "Central", value: "central" },
  ];

  const industryOptions = [
    { label: "Tech & IT", value: "tech" },
    { label: "Creative & Design", value: "design" },
    { label: "Marketing", value: "marketing" },
  ];

  const categoryOptions = [
    { label: "Full Time", value: "full-time" },
    { label: "Part Time", value: "part-time" },
    { label: "Remote", value: "remote" },
    { label: "Commission", value: "commission" },
  ];

  const salaryOptions = [
    { label: "₱10k - ₱20k", value: "10-20" },
    { label: "₱20k - ₱40k", value: "20-40" },
    { label: "₱40k+", value: "40plus" },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.searchBar}>
        <div className={styles.inputGroup}>
          <Search size={20} className={styles.icon} />
          <input
            type="text"
            placeholder="Job titles..."
            className={styles.mainInput}
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.filterGroup}>
          <CustomSelect
            icon={MapPin}
            placeholder="Location"
            options={townOptions}
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.filterGroup}>
          <CustomSelect
            icon={Clock}
            placeholder="Type"
            options={categoryOptions}
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.filterGroup}>
          <CustomSelect
            icon={Briefcase}
            placeholder="Industry"
            options={industryOptions}
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.filterGroup}>
          <CustomSelect icon={Banknote} placeholder="Salary" />
        </div>

        <button className={styles.searchBtn}>
          <span>Find Jobs</span>
        </button>
      </div>
    </section>
  );
};

export default SearchFilter;
