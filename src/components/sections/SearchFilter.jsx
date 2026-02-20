"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, MapPin, Banknote, Clock } from "lucide-react";
import styles from "./SearchFilter.module.css";
import CustomSelect from "../ui/CustomSelect";

const SearchFilter = ({ locations = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Initialize state once from URL
  const [filters, setFilters] = useState({
    query: searchParams.get("query") || "",
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
    salary: searchParams.get("salary") || "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();

    // Add parameters to URL only if they have a value
    if (filters.query) params.set("query", filters.query);
    if (filters.location) params.set("location", filters.location);
    if (filters.type) params.set("type", filters.type);
    if (filters.salary) params.set("salary", filters.salary);

    // Update URL to trigger Server Component re-fetch
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const categoryOptions = [
    { label: "Full Time", value: "Full-time" },
    { label: "Part Time", value: "Part-time" },
    { label: "Contract", value: "Contract" },
    { label: "Commission", value: "Commission" },
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
            placeholder="Job titles or company..."
            className={styles.mainInput}
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          />
        </div>
        <div className={styles.divider} />
        <div className={styles.filterGroup}>
          <CustomSelect
            icon={MapPin}
            placeholder="Location"
            options={locations}
            value={filters.location}
            onChange={(val) => setFilters({ ...filters, location: val })}
          />
        </div>
        <div className={styles.divider} />
        <div className={styles.filterGroup}>
          <CustomSelect
            icon={Clock}
            placeholder="Type"
            options={categoryOptions}
            value={filters.type}
            onChange={(val) => setFilters({ ...filters, type: val })}
          />
        </div>
        <div className={styles.divider} />
        <div className={styles.filterGroup}>
          <CustomSelect
            icon={Banknote}
            placeholder="Salary"
            options={salaryOptions}
            value={filters.salary}
            onChange={(val) => setFilters({ ...filters, salary: val })}
          />
        </div>
        <button className={styles.searchBtn} onClick={handleSearch}>
          <span>Find Jobs</span>
        </button>
      </div>
    </section>
  );
};

export default SearchFilter;
