import "./loginForm.css";
import infinity from "../../assets/infinity.png";
import InputForm from "../InputForm/inputForm";
import { useState } from "react";
import { useNavigate } from "react-router";
import SubmitButton from "../SubmitButton/submitButton";
import { login } from "../../services/AuthService";
import ErrorMessage from "../ErrorMessage/errorMessage";

function LoginForm() {
  let navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleInputChange(id, value) {
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    login(data.email, data.password)
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("id", response.id);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Email ou senha inválidos!");
      });
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
            required={true}
            onInputChange={handleInputChange}
          />

          <InputForm
            type="password"
            placeholder="senha"
            id="password"
            value={data.password}
            variant="white"
            required={true}
            onInputChange={handleInputChange}
          />

          <SubmitButton type="submit" className="buttonForm">
            Acesse agora
          </SubmitButton>
        </form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </section>
  );
}

export default LoginForm;
