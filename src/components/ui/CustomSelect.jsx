"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./CustomSelect.module.css";

// ADD 'value' to props
const CustomSelect = ({
  icon: Icon,
  options,
  placeholder,
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Find the label for the current value to display in the header
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
    onChange?.(option.value); // Send value to parent
  };

  return (
    <div className={styles.selectWrapper} ref={containerRef}>
      <div
        className={`${styles.selectHeader} ${isOpen ? styles.active : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.leftContent}>
          {Icon && <Icon size={20} className={styles.icon} />}
          {/* Use selectedOption.label if it exists, otherwise show placeholder */}
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
              className={`${styles.optionItem} ${value === opt.value ? styles.selectedOption : ""}`}
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
