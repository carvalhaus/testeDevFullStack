import "./dashboard.css";
import CreateUser from "../../components/CreateUser/createUser";
import UserCard from "../../components/UserCard/userCard";
import senacLearning from "../../assets/senac-learning.webp";
import { Link, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { logout } from "../../services/AuthService";
import UserModal from "../../components/UserModal/userModal";
import { useUserContext } from "../../contexts/UserContext";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";

function Dashboard() {
  const navigate = useNavigate();

  const { users, userData, loadUsers, loadUser } = useUserContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  function openEditModal() {
    setSelectedUser(userData);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedUser(null);
  }

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
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("id");

    loadUser(id);

    loadUsers();
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
            <button
              ref={buttonRef}
              onClick={openEditModal}
              disabled={userData.level === 3}
              title={
                userData.level === 3
                  ? "Você não tem permissão para editar seu perfil."
                  : ""
              }
            >
              Editar perfil
            </button>
            <button onClick={handleLogout}>Logout</button>

            {userData && isModalOpen && (
              <UserModal
                ref={modalRef}
                title="Editar"
                user={selectedUser}
                onClose={closeModal}
                loggedUserLevel={userData.level}
              />
            )}
          </div>
        </div>
      </header>

      <section className="createUsers">
        <CreateUser
          disabled={userData.level === 3}
          loggedUserLevel={userData.level}
        />
      </section>

      <section className="listUsers">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            loggedUserId={userData.id}
            loggedUserLevel={userData.level}
          />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;
