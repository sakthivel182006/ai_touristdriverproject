import { toast } from "react-toastify";

export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`
    }
  });

  // 🔥 SESSION EXPIRED HANDLING
  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // ✅ TOAST MESSAGE
    toast.warning("Session expired. You have been logged out.");

    // small delay so toast is visible
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  return res;
};
