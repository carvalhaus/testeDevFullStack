import { useEffect, useRef, useState } from "react";
import "./actions.css";
import UserModal from "../UserModal/userModal";

function Actions() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  function openDropdown() {
    setDropdownOpen((prevState) => !prevState);
  }

  function openEditModal() {
    setIsModalOpen(true);
    setDropdownOpen(false); // Close dropdown when modal opens
  }

  function closeModal() {
    setIsModalOpen(false);
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
        buttonRef.current && // Ensure the modal doesn't close when clicking the button
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
      <button className="actions" onClick={openDropdown} ref={buttonRef}>
        Ações<span>&#11206;</span>
      </button>

      {isDropdownOpen && (
        <div className="dropdownMenu" ref={dropdownRef}>
          <button className="dropdownItem" onClick={openEditModal}>
            Editar
          </button>
          <button className="dropdownItem">Excluir</button>
        </div>
      )}

      {isModalOpen && (
        <UserModal ref={modalRef} title="Editar" onClose={closeModal} />
      )}
    </div>
  );
}

export default Actions;
