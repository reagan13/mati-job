"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import {
  Briefcase,
  MapPin,
  Banknote,
  Clock,
  FileText,
  Home,
  Landmark,
  Image as ImageIcon,
  X,
} from "lucide-react";
import styles from "./PostJobForm.module.css";
import Button from "./Button";
import CustomSelect from "./CustomSelect";

export default function PostJobForm({ userProfile }) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    company: userProfile?.company_name || "",
    location: "",
    full_address: "",
    landmark: "",
    type: "",
    salary: "",
    description: "",
  });

  const jobTypeOptions = [
    { label: "Full-time", value: "Full-time" },
    { label: "Contract", value: "Contract" },
    { label: "Freelance", value: "Freelance" },
    { label: "Commision", value: "Commision" },
    { label: "Remote", value: "Remote" },
    { label: "Internship", value: "Internship" },
  ];

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.type) return alert("Please select an employment type");
    if (!formData.location) return alert("Please select a location/barangay");

    setLoading(true);
    let imageUrl = null;

    if (selectedFile) {
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `job-posters/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("job-attachments")
        .upload(filePath, selectedFile);

      if (uploadError) {
        alert("Error uploading image: " + uploadError.message);
        setLoading(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("job-attachments").getPublicUrl(filePath);

      imageUrl = publicUrl;
    }

    const { error } = await supabase.from("jobs").insert([
      {
        ...formData,
        image_url: imageUrl,
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
        full_address: "",
        landmark: "",
        salary: "",
        description: "",
        type: "",
      });
      setSelectedFile(null);
      setPreviewUrl(null);
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

      <div className={styles.gridInputs}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <Home size={16} /> Full Address
          </label>
          <input
            required
            className={styles.textInput}
            placeholder="Street, Phase, House No."
            value={formData.full_address}
            onChange={(e) =>
              setFormData({ ...formData, full_address: e.target.value })
            }
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <Landmark size={16} /> Landmark
          </label>
          <input
            className={styles.textInput}
            placeholder="e.g. Near Mati City Hall"
            value={formData.landmark}
            onChange={(e) =>
              setFormData({ ...formData, landmark: e.target.value })
            }
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>
          <ImageIcon size={16} /> Hiring Visual (Optional)
        </label>
        <div className={styles.fileUploadContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="fileInput"
            className={styles.hiddenInput}
          />
          {!previewUrl ? (
            <label htmlFor="fileInput" className={styles.fileLabel}>
              <span>Click to upload hiring poster or photo</span>
            </label>
          ) : (
            <div className={styles.previewContainer}>
              <img
                src={previewUrl}
                alt="Preview"
                className={styles.imagePreview}
              />
              <button
                type="button"
                onClick={removeFile}
                className={styles.removeBtn}
              >
                <X size={16} />
              </button>
            </div>
          )}
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
