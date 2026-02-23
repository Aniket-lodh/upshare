import { apiRequest } from "./client.js";

export const loginWithPasscode = async function (inputs) {
  await apiRequest({
    method: "POST",
    url: "/users/login",
    data: inputs,
  });
  return await getMe();
};

export const SignupWithPasscode = async function (inputs) {
  await apiRequest({
    method: "POST",
    url: "/users/signup",
    data: inputs,
  });
  return await getMe();
};

export const UpdateProfile = async function (userInputs) {
  return await apiRequest({
    method: "PATCH",
    url: "/users/profile/edit",
    data: userInputs,
    headers: { "Content-Type": "multipart/form-data" },
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

export const followUser = async function (id) {
  return await apiRequest({
    method: "POST",
    url: `/users/profile/follow/${id}`,
  });
};

export const unFollowUser = async function (id) {
  return await apiRequest({
    method: "POST",
    url: `/users/profile/unfollow/${id}`,
  });
};
