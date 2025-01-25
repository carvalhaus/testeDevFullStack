import "./submitButton.css";

function SubmitButton({ children }) {
  return (
    <button type="submit" className="buttonForm">
      {children}
    </button>
  );
}

export default SubmitButton;
