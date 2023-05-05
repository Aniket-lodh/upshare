import { createContext, useState } from "react";

const demoUser = {
  status: "success",
  data: {
    _id: "109idx3a5j",
    name: "aniket lodh",
    email: "aniketlodh@gmail.co",
    photo: "user-avatar.jpg",
    location: "los angeles,ca",
  },
};
const userInfoFromStorage = localStorage.getItem("curUser")
  ? JSON.parse(localStorage.getItem("curUser"))
  : localStorage.setItem("curUser",JSON.stringify(demoUser)); //Make it null for data fetching from backend

const UserContext = createContext({
  user: userInfoFromStorage,
  addUser: function (userData) {},
  removeUser: function () {},
});

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState(userInfoFromStorage);
  function addUserHandler(userData) {
    setCurrentUser(userData);
    localStorage.setItem("curUser", JSON.stringify(userData));
  }

  function removeUserHandler() {
    setCurrentUser(null);
    localStorage.removeItem("curUser");
  }

  const context = {
    user: currentUser,
    addUser: addUserHandler,
    removeUser: removeUserHandler,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
