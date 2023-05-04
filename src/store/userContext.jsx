import { createContext, useState } from "react";

const userInfoFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const UserContext = createContext({
  user: userInfoFromStorage,
  addUser: function (userData) {},
  removeUser: function () {},
});

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState(userInfoFromStorage);

  function addUserHandler(userData) {
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function removeUserHandler() {
    setCurrentUser(null);
    localStorage.removeItem("user");
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
