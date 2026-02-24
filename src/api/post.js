import { apiRequest } from "./client.js";

export const createPost = async (formData) => {
  return await apiRequest({
    method: "POST",
    url: "/posts",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getFeed = async (page = 1, signal) => {
  return await apiRequest({
    method: "GET",
    url: `/posts/feed?page=${page}`,
    signal,
  });
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
