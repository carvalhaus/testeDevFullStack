import { forwardRef, useState } from "react";
import "./userModal.css";
import InputForm from "../InputForm/inputForm";
import SubmitButton from "../SubmitButton/submitButton";

function UserModal(props, ref) {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    userLevel: "",
  });

  function handleInputChange(id, value) {
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    console.log(data);
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(
      `SUBMIT: ${data.email}; ${data.name}; ${data.password}; ${data.confirmPassword}; ${data.userLevel}; `
    );
  }

  return (
    <div className="userModal">
      <form className="modalForm" ref={ref} onSubmit={handleSubmit}>
        <button type="button" className="closeButton" onClick={props.onClose}>
          &times;
        </button>

        <p className="modalFormHeader">{`${props.title}`} usuário</p>

        <InputForm
          variant="black"
          type="email"
          placeholder="email"
          id="email"
          value={data.email}
          onInputChange={handleInputChange}
        />

        <InputForm
          variant="black"
          type="text"
          placeholder="nome"
          id="name"
          value={data.name}
          onInputChange={handleInputChange}
        />

        <InputForm
          variant="black"
          type="password"
          placeholder="senha"
          id="password"
          value={data.password}
          onInputChange={handleInputChange}
        />

        <InputForm
          variant="black"
          type="password"
          placeholder="confirmar senha"
          id="confirmPassword"
          value={data.confirmPassword}
          onInputChange={handleInputChange}
        />

        <select
          className="userLevel"
          id="userLevel"
          value={data.userLevel}
          onChange={(e) => handleInputChange("userLevel", e.target.value)}
        >
          <option value="1">Administrador</option>
          <option value="2">Moderador</option>
          <option value="3">Leitor</option>
        </select>

        <SubmitButton>Salvar</SubmitButton>
      </form>
    </div>
  );
}

export default forwardRef(UserModal);
