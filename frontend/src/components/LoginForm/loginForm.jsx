import "./loginForm.css";
import infinity from "../../assets/infinity.png";
import InputForm from "../InputForm/inputForm";
import { useState } from "react";
import { useNavigate } from "react-router";
import SubmitButton from "../SubmitButton/submitButton";

function LoginForm() {
  let navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
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

    navigate("/dashboard");

    console.log(`SUBMIT: ${data.email} + ${data.password}`);
  }

  return (
    <section className="loginFormContainer">
      <div className="loginForm">
        <div className="formHeader">
          <img src={infinity} width={80} height={40} />
          <h1>Senac Learning</h1>
          <h2>You connected</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <p>Faça o seu Login</p>

          <InputForm
            type="email"
            placeholder="email"
            id="email"
            value={data.email}
            variant="white"
            onInputChange={handleInputChange}
          />

          <InputForm
            type="password"
            placeholder="senha"
            id="password"
            value={data.password}
            variant="white"
            onInputChange={handleInputChange}
          />

          <SubmitButton type="submit" className="buttonForm">
            Acesse agora
          </SubmitButton>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
