import MyButton from "./MyButton";
import MyInput from "./MyInput";
import "../styles/button.css";

const AddItemForm = ({ listItems, newItem, setNewItem, setItem }) => {
  const addTask = () => {
    if (newItem) {
      let num = listItems.length + 1;
      let newEntry = { userId: 1, id: num, title: newItem, completed: false };
      postNewItem(newEntry);
      setItem([...listItems, newEntry]);
      setNewItem("");
    }
  };

  function postNewItem(newEntry) {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({ newEntry }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          alert(error);
        }
      );
  }

  return (
    <>
      <div className="row">
        <MyInput
          handleChanged={(e) => setNewItem(e)}
          placeholder={"Add your task"}
          value={newItem}
        ></MyInput>
        <MyButton
          buttonClassName="add"
          handleClick={addTask}
          name={"Add"}
        ></MyButton>
      </div>
    </>
  );
};

export default AddItemForm;
