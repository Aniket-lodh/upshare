import api from "./axios";

export const apiRequest = async (config) => {
  try {
    const res = await api(config);

    if (!res?.data) {
      throw new Error("Empty server response");
    }

    const { success, message, data } = res.data;

    if (typeof success !== "boolean") {
      throw new Error("Invalid server response format");
    }

    if (!success) {
      throw new Error(message || "Request failed");
    }

    return data;
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      throw new Error("Server is waking up. Please try again.");
    }

    if (err.response) {
      const backendMessage = err.response.data?.message || "Server error";
      throw new Error(backendMessage);
    }

    if (err.request) {
      throw new Error("Network error. Please try again.");
    }

    throw new Error(err.message || "Unexpected error");
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/users/logout");
  } catch {
    // Ignore errors — logout should always clear client state
  }
};
