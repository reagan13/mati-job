import { useState } from "react";
import { signUpUser } from "../app/actions/auth";

export const useSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const validations = {
    length: formData.password.length >= 8,
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*]/.test(formData.password),
    match:
      formData.password === formData.confirmPassword &&
      formData.confirmPassword !== "",
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setRole = (role) => setFormData((prev) => ({ ...prev, role }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(validations).every(Boolean)) return;

    setLoading(true);
    const data = new FormData(e.target);
    data.append("role", formData.role);

    const result = await signUpUser(data);
    if (result.error) setMessage({ type: "error", text: result.error });
    else setMessage({ type: "success", text: result.success });
    setLoading(false);
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
