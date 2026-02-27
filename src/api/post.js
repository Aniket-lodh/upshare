import { apiRequest } from "./client.js";
import api from "./axios.js";

export const createPost = async (formData, onProgress) => {
  const res = await api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percent);
      }
    },
  });

  return res.data.data; // because backend returns { success, message, data }
};

export const getFeed = async (page = 1, signal) => {
  const res = await api.get(`/posts/feed?page=${page}`, { signal });
  return {
    posts: res.data?.data || [],
    pagination: res.data?.pagination || { page: 1, pages: 0 },
  };
};

export const getPostById = async (id, signal) => {
  return await apiRequest({
    method: "GET",
    url: `/posts/${id}`,
    signal,
  });
};

export const likePost = async (id) => {
  return await apiRequest({
    method: "POST",
    url: `/posts/${id}/like`,
  });
};

export const unlikePost = async (id) => {
  return await apiRequest({
    method: "POST",
    url: `/posts/${id}/unlike`,
  });
};

export const deletePost = async (id) => {
  return await apiRequest({
    method: "DELETE",
    url: `/posts/${id}`,
  });
};
