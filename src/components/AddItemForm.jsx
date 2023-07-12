import MyButton from "./MyButton";
import MyInput from "./MyInput";
import "../styles/dark/add-button.css";
import "../styles/light/add-button.css";
import { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import {
  ItemsDispatchContext,
  useItemsDispatch,
} from "../Context/ItemsContext";

const AddItemForm = () => {
  const [newItem, setNewItem] = useState(null);
  const theme = useContext(ThemeContext);
  const dispatch = useItemsDispatch(ItemsDispatchContext);

  return (
    <>
      <div className="row">
        <MyInput
          handleChanged={(text) => setNewItem(text)}
          placeholder={"Add your task"}
          value={newItem}
        ></MyInput>
        <MyButton
          buttonClassName={"add_button-" + theme}
          handleClick={() => {
            dispatch({
              type: "add",
              title: newItem,
            });
          }}
          name={"Add"}
        ></MyButton>
      </div>
    </>
  );
};

export default AddItemForm;
