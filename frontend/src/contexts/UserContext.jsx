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
        if (err.response && err.response.status === 401) {
          setError(err.response);

          console.error(err);
        }
      });
  }

  function loadUser(id) {
    getUser(id)
      .then((user) => {
        setUserData(user);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setError(err.response);

          console.error(err);
        }
      });
  }

  function removeUser(id, token) {
    deleteUser(token, id)
      .then(() => {
        alert("Usuário excluído com sucesso!");
        loadUsers();
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          return alert("Não foi possível excluir o usuário!");
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
