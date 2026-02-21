export const JobModel = {
  validate: (data) => {
    const errors = {};
    if (!data.title) errors.title = "Job title is required";
    if (!data.company) errors.company = "Company name is required";
    if (!data.location) errors.location = "Barangay is required";
    if (!data.type) errors.type = "Employment type is required";
    if (!data.contact) errors.contact = "Contact number is required";

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  formatForStorage: (data, userId, imageUrl) => {
    return {
      title: data.title,
      company: data.company,
      location: data.location,
      full_address: data.full_address,
      landmark: data.landmark,
      type: data.type,
      salary: data.salary,
      description: data.description,
      contact_number: data.contact,
      facebook_link: data.fb_link || null,
      image_url: imageUrl,
      user_id: userId,
      posted: new Date().toISOString(),
    };
  },
};
