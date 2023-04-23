import {user_profile_data} from "../data/mock.js";

const fetchUser = (userId) => {
    let user = undefined;

    // return found user data and store it in the user variable
    user = user_profile_data.find((value) => value._id === userId);

    return user;
}
export default fetchUser;