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
    if (resp.status === 200) {
      const user = await getMe();
      return user;
    }
  } catch (err) {
    return err.response.data;
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
      localStorage.setItem("curUser", JSON.stringify(profile.data.data));
      return profile.data;
    }
  } catch (error) {
    console.log(error);
  }
};
