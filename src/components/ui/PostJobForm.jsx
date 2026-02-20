"use client";
import { useState } from "react";
import { usePostJob } from "@/hooks/usePostJob";
import ConfirmModal from "./ConfirmModal";
import Toast from "./Toast";
import {
  Briefcase,
  Building2,
  MapPin,
  Banknote,
  Clock,
  FileText,
  Home,
  Landmark,
  Phone,
  Facebook,
  Image as ImageIcon,
  X,
} from "lucide-react";
import styles from "./PostJobForm.module.css";
import Button from "./Button";
import CustomSelect from "./CustomSelect";

export default function PostJobForm({ userProfile }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const {
    formData,
    setFormData,
    loading,
    previewUrl,
    handleFileChange,
    removeFile,
    submitJob,
  } = usePostJob(userProfile);

  const handlePreSubmit = (e) => {
    e.preventDefault();
    setIsConfirmOpen(true);
  };

  const handleFinalConfirm = async () => {
    try {
      await submitJob();
      setIsConfirmOpen(false);
      setShowToast(true);
    } catch (error) {
      setIsConfirmOpen(false);
      // You can implement an Error Toast here similarly
      console.error(error.message);
    }
  };

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

  return (
    <>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleFinalConfirm}
        loading={loading}
        title="Post Job Listing?"
        message="Are you sure you want to publish this job? It will be visible to everyone immediately."
      />

      {showToast && (
        <Toast
          message="Job successfully published!"
          onClose={() => setShowToast(false)}
        />
      )}

      <form className={styles.formContainer} onSubmit={handlePreSubmit}>
        <div className={styles.gridInputs}>
          <div className={styles.inputGroup}>
            <div className={styles.floatingGroup}>
              <input
                required
                className={styles.textInput}
                placeholder=" "
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <label className={styles.floatingLabel}>
                <Briefcase size={14} /> Job Title
              </label>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.floatingGroup}>
              <input
                required
                className={styles.textInput}
                placeholder=" "
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
              <label className={styles.floatingLabel}>
                <Building2 size={14} /> Company Name
              </label>
            </div>
          </div>
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
              <MapPin size={16} /> Barangay
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
            <div className={styles.floatingGroup}>
              <input
                required
                className={styles.textInput}
                placeholder=" "
                value={formData.full_address}
                onChange={(e) =>
                  setFormData({ ...formData, full_address: e.target.value })
                }
              />
              <label className={styles.floatingLabel}>
                <Home size={14} /> Full Address
              </label>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.floatingGroup}>
              <input
                className={styles.textInput}
                placeholder=" "
                value={formData.landmark}
                onChange={(e) =>
                  setFormData({ ...formData, landmark: e.target.value })
                }
              />
              <label className={styles.floatingLabel}>
                <Landmark size={14} /> Landmark
              </label>
            </div>
          </div>
        </div>

        <div className={styles.gridInputs}>
          <div className={styles.inputGroup}>
            <div className={styles.floatingGroup}>
              <input
                required
                className={styles.textInput}
                placeholder=" "
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
              />
              <label className={styles.floatingLabel}>
                <Phone size={14} /> Contact Number
              </label>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.floatingGroup}>
              <input
                className={styles.textInput}
                placeholder=" "
                value={formData.fb_link}
                onChange={(e) =>
                  setFormData({ ...formData, fb_link: e.target.value })
                }
              />
              <label className={styles.floatingLabel}>
                <Facebook size={14} /> Facebook Link (Optional)
              </label>
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <ImageIcon size={16} /> Hiring Visual
          </label>
          <div className={styles.fileUploadContainer}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="fileInput"
              className={styles.hiddenInput}
              style={{ display: "none" }}
            />
            {!previewUrl ? (
              <label htmlFor="fileInput" className={styles.fileLabel}>
                Click to upload hiring poster
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
          <div className={styles.floatingGroup}>
            <input
              className={styles.textInput}
              placeholder=" "
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
            />
            <label className={styles.floatingLabel}>
              <Banknote size={14} /> Salary Range
            </label>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.floatingGroup}>
            <textarea
              className={styles.textArea}
              rows="5"
              placeholder=" "
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <label className={styles.floatingLabel}>
              <FileText size={14} /> Job Description
            </label>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className={styles.submitBtn}
        >
          {loading ? "Processing..." : "PUBLISH LISTING"}
        </Button>
      </form>
    </>
  );
}
