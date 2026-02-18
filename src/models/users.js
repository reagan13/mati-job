export const UserProfileModel = (formData) => {
  return {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    role: formData.get("role"),
    createdAt: new Date().toISOString(),
  };
};
