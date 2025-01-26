import "./inputForm.css";

function InputForm({
  type,
  placeholder,
  id,
  value,
  onInputChange,
  variant,
  required,
}) {
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
        name={id}
        value={value}
        autoComplete="off"
        onChange={handleInputChange}
        required={required}
      />
    </>
  );
}

export default InputForm;
