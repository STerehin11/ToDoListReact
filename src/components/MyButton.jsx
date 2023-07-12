const MyButton = ({ handleClick, name, buttonClassName }) => {
  return (
    <>
      <button className={buttonClassName} onClick={handleClick}>
        {name}
      </button>
    </>
  );
};

export default MyButton;
