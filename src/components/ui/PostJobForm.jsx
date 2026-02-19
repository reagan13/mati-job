"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Briefcase, MapPin, Banknote, Clock, FileText } from "lucide-react";
import styles from "./PostJobForm.module.css";
import Button from "./Button";
import CustomSelect from "./CustomSelect";

export default function PostJobForm({ userProfile }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: userProfile?.company_name || "",
    location: "",
    type: "",
    salary: "",
    description: "",
  });

  const jobTypeOptions = [
    { label: "Full-time", value: "Full-time" },
    { label: "Contract", value: "Contract" },
    { label: "Freelance", value: "Freelance" },
    { label: "Remote", value: "Remote" },
    { label: "Internship", value: "Internship" },
  ];

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.type) return alert("Please select an employment type");

    setLoading(true);
    const { error } = await supabase.from("jobs").insert([
      {
        ...formData,
        user_id: userProfile?.id,
        posted: new Date().toISOString(),
      },
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Job successfully posted!");
      setFormData({
        title: "",
        location: "",
        salary: "",
        description: "",
        type: "",
      });
    }
    setLoading(false);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {/* Job Title - Full Width */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          <Briefcase size={16} /> Job Title
        </label>
        <input
          required
          className={styles.textInput}
          placeholder="e.g. Senior Full Stack Developer"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      {/* Employment Type - Full Width Custom Select */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          <Clock size={16} /> Employment Type
        </label>
        <div className={styles.selectWrapperCustom}>
          <CustomSelect
            icon={Clock}
            options={jobTypeOptions}
            placeholder="Select job type..."
            onChange={(val) => setFormData({ ...formData, type: val })}
          />
        </div>
      </div>

      {/* Grid for Location and Salary - Consistent Width */}
      <div className={styles.gridInputs}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <MapPin size={16} /> Location
          </label>
          <input
            required
            className={styles.textInput}
            placeholder="City or Remote"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <Banknote size={16} /> Salary Range
          </label>
          <input
            className={styles.textInput}
            placeholder="e.g. ₱90k - ₱140k"
            value={formData.salary}
            onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }
          />
        </div>
      </div>

      {/* Job Description - Full Width */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          <FileText size={16} /> Job Description
        </label>
        <textarea
          className={styles.textArea}
          rows="5"
          placeholder="Describe the responsibilities and requirements..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className={styles.submitBtn}
      >
        {loading ? "Publishing..." : "PUBLISH LISTING"}
      </Button>
    </form>
  );
}
