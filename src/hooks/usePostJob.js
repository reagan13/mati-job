import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { createJobAction } from "@/app/post-job/jobActions";
import { JobModel } from "@/models/Job";

export function usePostJob(userProfile) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // FIX: Initialize contact and fb_link with empty strings
  const [formData, setFormData] = useState({
    title: "",
    company: userProfile?.company_name || "",
    location: "",
    full_address: "",
    landmark: "",
    type: "",
    salary: "",
    description: "",
    contact: "", // Initialized
    fb_link: "", // Initialized
  });

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

  const submitJob = async () => {
    const validation = JobModel.validate(formData);
    if (!validation.isValid) {
      throw new Error(Object.values(validation.errors)[0]);
    }

    setLoading(true);
    try {
      let imageUrl = null;

      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `posters/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("job-attachments")
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("job-attachments").getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      await createJobAction(formData, imageUrl);

      setFormData({
        title: "",
        company: userProfile?.company_name || "",
        location: "",
        full_address: "",
        landmark: "",
        salary: "",
        description: "",
        type: "",
        contact: "",
        fb_link: "",
      });
      removeFile();

      return { success: true };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    previewUrl,
    handleFileChange,
    removeFile,
    submitJob,
  };
}
