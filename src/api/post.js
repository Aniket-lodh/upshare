import api from "./axios.js";

export const createPost = async (formData) => {
  try {
    const resp = await api.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return resp.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getFeed = async (page = 1) => {
  try {
    const resp = await api.get(`/posts/feed?page=${page}`);
    return resp.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getPostById = async (id) => {
  try {
    const resp = await api.get(`/posts/${id}`);
    return resp.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const likePost = async (id) => {
  try {
    const resp = await api.post(`/posts/${id}/like`, {});
    return resp.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const unlikePost = async (id) => {
  try {
    const resp = await api.post(`/posts/${id}/unlike`, {});
    return resp.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deletePost = async (id) => {
  try {
    const resp = await api.delete(`/posts/${id}`);
    return resp.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
