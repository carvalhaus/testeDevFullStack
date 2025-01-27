import { useEffect, useRef, useState } from "react";
import "./actions.css";
import UserModal from "../UserModal/userModal";
import { useUserContext } from "../../contexts/UserContext";

function Actions({ loggedUserId, loggedUserLevel, user }) {
  const { removeUser } = useUserContext();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  function openDropdown() {
    setDropdownOpen((prevState) => !prevState);
  }

  function openEditModal() {
    setSelectedUser(user);
    setIsModalOpen(true);
    setDropdownOpen(false);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedUser(null);
  }

  function onDelete() {
    const token = localStorage.getItem("token");

    removeUser(user.id, token, loggedUserLevel);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

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
    <div className="actionsContainer">
      <button
        className="actions"
        onClick={openDropdown}
        ref={buttonRef}
        disabled={loggedUserLevel === 3}
        title={
          loggedUserLevel === 3
            ? "Você não tem permissão para editar ou excluir usuários."
            : ""
        }
      >
        Ações<span>&#11206;</span>
      </button>

      {isDropdownOpen && (
        <div className="dropdownMenu" ref={dropdownRef}>
          <button className="dropdownItem" onClick={openEditModal}>
            Editar
          </button>
          <button
            className="dropdownItem"
            disabled={loggedUserLevel === 2 || loggedUserId === user.id}
            title={
              loggedUserId === user.id
                ? "Você não tem permissão para excluir seu próprio perfil."
                : "" || loggedUserLevel === 2
                ? "Você não tem permissão para excluir usuários."
                : ""
            }
            onClick={onDelete}
          >
            Excluir
          </button>
        </div>
      )}

      {isModalOpen && (
        <UserModal
          ref={modalRef}
          title="Editar"
          user={selectedUser}
          onClose={closeModal}
          loggedUserLevel={loggedUserLevel}
        />
      )}
    </div>
  );
}

export default Actions;
