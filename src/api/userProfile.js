import api from "./axios.js";

export const loginWithPasscode = async function (inputs) {
  try {
    const resp = await api.post("/users/login", inputs);
    if (resp.data.code === 200) {
      const user = await getMe();
      return user;
    }
  } catch (err) {
    return err.response?.data || err;
  }
};

export const SignupWithPasscode = async function (inputs) {
  try {
    const resp = await api.post("/users/signup", inputs);
    if (resp.data.code === 201) {
      const user = await getMe();
      return user;
    } else {
      return resp.data;
    }
  } catch (err) {
    return err.response?.data || err;
  }
};

export const UpdateProfile = async function (userInputs) {
  try {
    const resp = await api.patch("/users/profile/edit", userInputs, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (resp.data.code === 200) {
      return resp.data;
    }
    return resp;
  } catch (err) {
    return err.response;
  }
};

export const UploadImages = async (userFiles) => {
  try {
    const resp = await api.patch("/users/profile/upload", userFiles, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (resp.data.code === 200) return resp.data;
    return resp;
  } catch (err) {
    return err.response;
  }
};

export const getMe = async () => {
  try {
    const profile = await api.get("/users/profile/me");
    if (profile && profile.status === 200) {
      return profile.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getProfile = async (userId) => {
  try {
    const profile = await api.get(`/users/profile/${userId}`);
    if (profile && profile.status === 200) {
      return profile.data;
    }
  } catch (error) {
    return error;
  }
};

export const followUser = async function (id) {
  try {
    const resp = await api.post(`/users/profile/follow/${id}`, {});
    if (resp.status === 200 && resp.data.code === 200) return resp.data;
  } catch (err) {
    return err.response?.data;
  }
};

export const unFollowUser = async function (id) {
  try {
    const resp = await api.post(`/users/profile/unfollow/${id}`, {});
    if (resp.status === 200 && resp.data.code === 200) return resp.data;
  } catch (err) {
    return err.response?.data;
  }
};
