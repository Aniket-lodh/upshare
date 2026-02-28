import { apiRequest } from "./client.js";

export const loginWithPasscode = async (inputs) => {
  return await apiRequest({
    method: "POST",
    url: "/users/login",
    data: inputs,
  });
};

export const SignupWithPasscode = async (inputs) => {
  return await apiRequest({
    method: "POST",
    url: "/users/signup",
    data: inputs,
  });
};

export const UpdateProfile = async (userInputs) => {
  return await apiRequest({
    method: "PATCH",
    url: "/users/profile/edit",
    data: userInputs,
  });
};

export const UploadImages = async (userFiles) => {
  return await apiRequest({
    method: "PATCH",
    url: "/users/profile/upload",
    data: userFiles,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getMe = async () => {
  return await apiRequest({
    method: "GET",
    url: "/users/profile/me",
  });
};

export const getProfile = async (userId) => {
  return await apiRequest({
    method: "GET",
    url: `/users/profile/${userId}`,
  });
};

export const followUser = async (id) => {
  return await apiRequest({
    method: "POST",
    url: `/users/profile/follow/${id}`,
  });
};

export const unFollowUser = async (id) => {
  return await apiRequest({
    method: "POST",
    url: `/users/profile/unfollow/${id}`,
  });
};
