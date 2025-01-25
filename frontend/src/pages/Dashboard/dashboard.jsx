import "./dashboard.css";
import CreateUser from "../../components/CreateUser/createUser";
import UserCard from "../../components/UserCard/userCard";
import senacLearning from "../../assets/senac-learning.webp";
import { Link } from "react-router";

function Dashboard() {
  return (
    <main className="dashboard">
      <header className="dashboardHeader">
        <Link to={"/"}>
          <img src={senacLearning} width={180} height={82} />
        </Link>

        <h1>Bem vindo, Administrador</h1>
      </header>

      <section className="createUsers">
        <CreateUser />
      </section>

      <section className="listUsers">
        {Array.from({ length: 10 }).map((_, index) => (
          <UserCard key={index} />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;
