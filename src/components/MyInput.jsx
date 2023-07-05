import { useRef, useEffect } from "react";

const MyInput = ({ handleChanged, placeholder, value }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChanged(e.target.value)}
        ref={inputRef}
      />
    </>
  );
};

export default MyInput;
