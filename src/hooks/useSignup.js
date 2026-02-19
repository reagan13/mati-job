import { useState } from "react";
import { signUpUser } from "../app/actions/auth";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const router = useRouter();

  // 1. Local state for form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant", // Default selection
  });

  // 2. UI State
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // 3. Password Validation Logic
  const validations = {
    length: formData.password.length >= 8,
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*]/.test(formData.password),
    match:
      formData.password === formData.confirmPassword &&
      formData.confirmPassword !== "",
  };

  // 4. Input Handlers
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setRole = (role) => setFormData((prev) => ({ ...prev, role }));

  // 5. Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all validations pass before submitting
    if (!Object.values(validations).every(Boolean)) {
      setMessage({ type: "error", text: "Please fix password requirements." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    // Capture form inputs
    const data = new FormData(e.target);

    // IMPORTANT: Manually append the 'role' state
    // because the Role Cards in the UI are not native inputs.
    data.append("role", formData.role);

    const result = await signUpUser(data);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
      setLoading(false);
    } else {
      setMessage({ type: "success", text: result.success });

      // Allow user to see success message before redirecting
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return {
    formData,
    showPass,
    setShowPass,
    showConfirm,
    setShowConfirm,
    isFocused,
    setIsFocused,
    loading,
    message,
    validations,
    handleChange,
    setRole,
    handleSubmit,
  };
};
