import { forwardRef, useEffect, useState } from "react";
import "./userModal.css";
import InputForm from "../InputForm/inputForm";
import SubmitButton from "../SubmitButton/submitButton";
import { createUser, updateUser } from "../../services/UsersService";
import ErrorMessage from "../ErrorMessage/errorMessage";
import { useUserContext } from "../../contexts/UserContext";

function UserModal({ title, onClose, user, loggedUserLevel }, ref) {
  const { loadUsers, loadUser, error, setError, userData } = useUserContext();

  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    userLevel: 1,
  });

  useEffect(() => {
    if (user) {
      setData({
        email: user.email || "",
        name: user.name || "",
        password: "",
        confirmPassword: "",
        userLevel: user.level || 1,
      });
    }
    setError("");
  }, [user]);

  function handleInputChange(id, value) {
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      return setError("Senha e confirmação de senha não coincidem!");
    }

    const token = localStorage.getItem("token");

    const { confirmPassword, ...formData } = data;

    const finalData = { loggedUserLevel, ...formData };

    if (title === "Cadastrar") {
      console.log(finalData);
      createUser(finalData, token)
        .then(() => {
          setError("");
          onClose();
          loadUsers();
        })
        .catch((err) => {
          if (err.status === 400 || err.status === 403 || err.status === 422) {
            const errorMessage = err.response.data.message;

            setError(errorMessage);

            alert(errorMessage);
          }

          console.error(err);
        });
    } else {
      let updateData = { ...finalData };

      if (!finalData.password) {
        const { password, ...filteredData } = finalData;
        updateData = filteredData;
      }

      updateUser(updateData, token, user.id)
        .then(() => {
          setError("");
          onClose();
          loadUsers();
          loadUser(userData.id);
        })
        .catch((err) => {
          if (err.status === 400 || err.status === 403 || err.status === 422) {
            const errorMessage = err.response.data.message;

            setError(errorMessage);

            alert(errorMessage);
          }

          console.error(err);
        });
    }
  }

  return (
    <div className="userModal">
      <form className="modalForm" ref={ref} onSubmit={handleSubmit}>
        <button type="button" className="closeButton" onClick={onClose}>
          &times;
        </button>

        <p className="modalFormHeader">{`${title}`} usuário</p>

        <InputForm
          variant="black"
          type="email"
          placeholder="email"
          id="email"
          value={data.email}
          required={true}
          onInputChange={handleInputChange}
        />

        <InputForm
          variant="black"
          type="text"
          placeholder="nome"
          id="name"
          value={data.name}
          required={true}
          onInputChange={handleInputChange}
        />

        <InputForm
          variant="black"
          type="password"
          placeholder="senha"
          id="password"
          value={data.password}
          required={title === "Cadastrar"}
          onInputChange={handleInputChange}
        />

        <InputForm
          variant="black"
          type="password"
          placeholder="confirmar senha"
          id="confirmPassword"
          value={data.confirmPassword}
          required={title === "Cadastrar"}
          onInputChange={handleInputChange}
        />

        <select
          className="userLevel"
          id="userLevel"
          value={data.userLevel}
          required={true}
          onChange={(e) => handleInputChange("userLevel", e.target.value)}
        >
          <option value={1}>Administrador</option>
          <option value={2}>Moderador</option>
          <option value={3}>Leitor</option>
        </select>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SubmitButton>Salvar</SubmitButton>
      </form>
    </div>
  );
}

export default forwardRef(UserModal);
