import api from "./axios";

export const apiRequest = async (config) => {
  try {
    const res = await api(config);

    if (!res?.data) {
      throw new Error("Empty server response");
    }

    const { status, message, data } = res.data;

    // Strict response type guard
    if (typeof status !== "string") {
      throw new Error("Invalid server response format");
    }

    if (status !== "success") {
      throw new Error(message || "Request failed");
    }

    return data;
  } catch (err) {
    // Timeout handling
    if (err.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try again.");
    }

    if (err.response) {
      const backendMessage =
        err.response.data?.message ||
        err.response.data?.error ||
        "Server error";

      throw new Error(backendMessage);
    }

    if (err.request) {
      throw new Error("Network error. Please try again.");
    }

    throw new Error(err.message || "Unexpected error");
  }
};
