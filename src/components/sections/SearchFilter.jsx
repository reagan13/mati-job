"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, MapPin, Clock, X } from "lucide-react"; // Removed Banknote icon
import styles from "./SearchFilter.module.css";
import CustomSelect from "../ui/CustomSelect";

const SearchFilter = ({ locations = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Initialize state from URL (Removed salary)
  const [filters, setFilters] = useState({
    query: searchParams.get("query") || "",
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
  });

  // Check if any filter is currently active
  const hasActiveFilters = Object.values(filters).some((val) => val !== "");

  // Function to clear all filters
  const clearAllFilters = () => {
    const cleared = { query: "", location: "", type: "" };
    setFilters(cleared);
    router.push(pathname);
  };

  // Logic for individual text clear
  const clearQuery = () => setFilters({ ...filters, query: "" });

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (filters.query) params.set("query", filters.query);
    if (filters.location) params.set("location", filters.location);
    if (filters.type) params.set("type", filters.type);

    // Redirect specifically to the /search page
    router.push(`/search?${params.toString()}`);
  };

  const categoryOptions = [
    { label: "Full Time", value: "Full-time" },
    { label: "Part Time", value: "Part-time" },
    { label: "Contract", value: "Contract" },
    { label: "Commission", value: "Commission" },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.searchBar}>
        {/* Keyword Search with "X" */}
        <div className={styles.inputGroup}>
          <Search size={20} className={styles.icon} />
          <input
            type="text"
            placeholder="Job titles or company..."
            className={styles.mainInput}
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          />
          {filters.query && (
            <X
              size={18}
              className={styles.clearInputIcon}
              onClick={clearQuery}
            />
          )}
        </div>

        <div className={styles.divider} />

        {/* Location Filter */}
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

        {/* Job Type Filter */}
        <div className={styles.filterGroup}>
          <CustomSelect
            icon={Clock}
            placeholder="Type"
            options={categoryOptions}
            value={filters.type}
            onChange={(val) => setFilters({ ...filters, type: val })}
          />
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          {hasActiveFilters && (
            <button
              type="button"
              className={styles.clearAllBtn}
              onClick={clearAllFilters}
            >
              Clear
            </button>
          )}
          <button className={styles.searchBtn} onClick={handleSearch}>
            <span>Find Jobs</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
