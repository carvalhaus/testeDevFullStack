import { createContext, useContext, useState } from "react";
import { deleteUser, getUser, getUsers } from "../services/UsersService";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");

  function loadUsers() {
    getUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          const errorMessage = err.message;

          setError(errorMessage);

          alert(errorMessage);
        }

        console.error(err.code);
      });
  }

  function loadUser(id) {
    getUser(id)
      .then((user) => {
        setUserData(user);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          const errorMessage = err.message;

          setError(errorMessage);
        }

        console.error(err);
      });
  }

  function removeUser(id, token, loggedUserLevel) {
    deleteUser(token, id, loggedUserLevel)
      .then(() => {
        alert("Usuário excluído com sucesso!");
        loadUsers();
      })
      .catch((err) => {
        if (err.status === 400 || err.status === 403) {
          const errorMessage = err.response.data.message;

          setError(errorMessage);

          alert(errorMessage);
        }

        console.error(err);
      });
  }

  return (
    <UserContext.Provider
      value={{
        users,
        userData,
        loadUsers,
        loadUser,
        removeUser,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
