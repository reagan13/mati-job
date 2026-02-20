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
    location: "", // This will store the selected Barangay
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

  // All 26 Barangays of Mati City
  const matiBarangays = [
    { label: "Badas", value: "Badas" },
    { label: "Bobon", value: "Bobon" },
    { label: "Buso", value: "Buso" },
    { label: "Cabuaya", value: "Cabuaya" },
    { label: "Central (Poblacion)", value: "Central" },
    { label: "Culian", value: "Culian" },
    { label: "Dahican", value: "Dahican" },
    { label: "Danao", value: "Danao" },
    { label: "Dawan", value: "Dawan" },
    { label: "Don Enrique Lopez", value: "Don Enrique Lopez" },
    { label: "Don Martin Marundan", value: "Don Martin Marundan" },
    { label: "Don Salvador Lopez, Sr.", value: "Don Salvador Lopez, Sr." },
    { label: "Langka", value: "Langka" },
    { label: "Lawigan", value: "Lawigan" },
    { label: "Libudon", value: "Libudon" },
    { label: "Luban", value: "Luban" },
    { label: "Macambol", value: "Macambol" },
    { label: "Mamali", value: "Mamali" },
    { label: "Matiao", value: "Matiao" },
    { label: "Mayo", value: "Mayo" },
    { label: "Sainz", value: "Sainz" },
    { label: "Sanghay", value: "Sanghay" },
    { label: "Tagabakid", value: "Tagabakid" },
    { label: "Tagbinonga", value: "Tagbinonga" },
    { label: "Taguibo", value: "Taguibo" },
    { label: "Tamisan", value: "Tamisan" },
  ];

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.type) return alert("Please select an employment type");
    if (!formData.location) return alert("Please select a location/barangay");

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
        company: userProfile?.company_name || "",
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

      <div className={styles.gridInputs}>
        {/* Employment Type Dropdown */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <Clock size={16} /> Employment Type
          </label>
          <div className={styles.selectWrapperCustom}>
            <CustomSelect
              icon={Clock}
              options={jobTypeOptions}
              placeholder="Select type..."
              value={formData.type}
              onChange={(val) => setFormData({ ...formData, type: val })}
            />
          </div>
        </div>

        {/* Location / Barangay Dropdown */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <MapPin size={16} /> Barangay (Mati City)
          </label>
          <div className={styles.selectWrapperCustom}>
            <CustomSelect
              icon={MapPin}
              options={matiBarangays}
              placeholder="Select Barangay..."
              value={formData.location}
              onChange={(val) => setFormData({ ...formData, location: val })}
            />
          </div>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          <Banknote size={16} /> Salary Range
        </label>
        <input
          className={styles.textInput}
          placeholder="e.g. ₱20,000 - ₱30,000"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          <FileText size={16} /> Job Description
        </label>
        <textarea
          className={styles.textArea}
          rows="5"
          placeholder="Describe the job roles..."
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
