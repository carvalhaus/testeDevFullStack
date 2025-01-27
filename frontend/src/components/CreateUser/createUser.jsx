import "./createUser.css";
import userPlus from "../../assets/userPlus.svg";
import { useEffect, useRef, useState } from "react";
import UserModal from "../UserModal/userModal";

function CreateUser({ disabled, loggedUserLevel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  function openModal() {
    setIsModalOpen((prevState) => !prevState);
  }

  function closeModal() {
    setIsModalOpen(false);
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

  return (
    <div className="createUserContainer">
      <button
        className="createUserButton"
        onClick={openModal}
        ref={buttonRef}
        disabled={disabled}
        title={disabled ? "Você não tem permissão para criar usuários." : ""}
      >
        Criar usuário
        <img src={userPlus} width={22} height={22} />
      </button>

      {isModalOpen && (
        <UserModal
          ref={modalRef}
          title="Cadastrar"
          onClose={closeModal}
          loggedUserLevel={loggedUserLevel}
        />
      )}
    </div>
  );
}

export default CreateUser;
