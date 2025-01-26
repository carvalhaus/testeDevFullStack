import "./dashboard.css";
import CreateUser from "../../components/CreateUser/createUser";
import UserCard from "../../components/UserCard/userCard";
import senacLearning from "../../assets/senac-learning.webp";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getUser, getUsers } from "../../services/UsersService";
import { logout } from "../../services/AuthService";

function Dashboard() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);

  function handleLogout(e) {
    e.preventDefault();

    logout(localStorage.getItem("token"))
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    const id = localStorage.getItem("id");

    getUser(id)
      .then((user) => {
        console.log("User Data:", user);
        setUserData(user);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) return navigate("/");

        console.error(err);
      });

    getUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) return navigate("/");

        console.error(err);
      });
  }, []);

  return (
    <main className="dashboard">
      <header className="dashboardHeader">
        <Link to={"/"}>
          <img src={senacLearning} width={180} height={82} />
        </Link>

        <div>
          <h1>Bem vindo, {userData.name}</h1>

          <div className="userOptions">
            <button>Editar perfil</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <section className="createUsers">
        <CreateUser disabled={userData.level === 3} />
      </section>

      <section className="listUsers">
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            loggedUserLevel={userData.level}
            name={user.name}
            email={user.email}
          />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;
