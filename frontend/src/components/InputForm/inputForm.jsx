import "./inputForm.css";

function InputForm({ type, placeholder, id, value, onInputChange, variant }) {
  function handleInputChange(e) {
    const inputValue = e.target.value;

    onInputChange(id, inputValue);
  }

  return (
    <>
      <input
        className={`inputForm ${variant}`}
        placeholder={placeholder}
        type={type}
        id={id}
        value={value}
        onChange={handleInputChange}
        required
      />
    </>
  );
}

export default InputForm;
