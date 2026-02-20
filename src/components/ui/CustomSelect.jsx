"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./CustomSelect.module.css";

const CustomSelect = ({
  icon: Icon,
  options,
  placeholder,
  onChange,
  value, // Received from PostJobForm
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // This line now successfully finds the option because 'value' is provided
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div className={styles.selectWrapper} ref={containerRef}>
      <div
        className={`${styles.selectHeader} ${isOpen ? styles.active : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.leftContent}>
          {Icon && <Icon size={20} className={styles.icon} />}
          <span className={selectedOption ? styles.value : styles.placeholder}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`${styles.chevron} ${isOpen ? styles.rotate : ""}`}
        />
      </div>

      {isOpen && (
        <div className={styles.optionsList}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`${styles.optionItem} ${
                value === opt.value ? styles.selectedOption : ""
              }`}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
