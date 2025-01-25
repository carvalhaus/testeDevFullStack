import "./login.css";
import senacIcon from "../../assets/senac.png";
import LoginForm from "../../components/LoginForm/loginForm";

function Login() {
  return (
    <main className="mainLogin">
      <header className="loginHeader">
        <img src={senacIcon} width={180} height={56} />

        <p className="termsOfUse">Política de Privacidade | Termos de uso</p>
      </header>

      <LoginForm />

      <footer className="loginFooter">
        <small>Desenvolvido por Senac RS</small>
      </footer>
    </main>
  );
}

export default Login;
