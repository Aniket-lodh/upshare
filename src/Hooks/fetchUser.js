import { user_profile_data } from "../data/mock.js";

const fetchUser = (userObj) => {
  let user = undefined;

  // return found user data and store it in the user variable
  user = user_profile_data.find((value) => value._id === userObj?.data?._id);

  return user;
};
export default fetchUser;
