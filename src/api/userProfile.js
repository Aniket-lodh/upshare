import axios from "axios";

export const loginWithPasscode = async function (inputs) {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_SERVER}/users/login`,
      inputs,
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // mode: "same-origin",
        // redirect: "follow",
      }
    );
    if (resp.data.code === 200) {
      const user = await getMe();
      return user;
    }
  } catch (err) {
    return err.response.data;
  }
};

export const SignupWithPasscode = async function (inputs) {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_SERVER}/users/signup`,
      inputs,
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (resp.data.code === 201) {
      const user = await getMe();
      return user;
    } else {
      return resp.data;
    }
  } catch (err) {
    return err.response.data;
  }
};

export const UpdateProfile = async function (userInputs, userFiles) {
  try {
    const resp = await axios.patch(
      "http://localhost:2408/users/profile/edit",
      userInputs,
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
        },
      }
    );
    if (resp.data.code === 200) {
      const resp = await UploadImages(userFiles);
      return resp.data;
    }
    return resp;
  } catch (err) {
    return err.response;
  }
};

const UploadImages = async (userFiles) => {
  try {
    const resp = await axios.patch(
      "http://localhost:2408/users/profile/upload",
      userFiles,
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
        },
      }
    );
    return resp;
  } catch (err) {
    return err.response;
  }
};

const getMe = async () => {
  try {
    const profile = await axios.get(
      `${import.meta.env.VITE_SERVER}/users/profile/me`,
      {
        withCredentials: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (profile && profile.status === 200) {
      return profile.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (userId) => {
  try {
    const profile = await axios.get(
      `${import.meta.env.VITE_SERVER}/users/profile/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (profile && profile.status === 200) {
      return profile.data;
    }
  } catch (error) {
    return error;
  }
};
