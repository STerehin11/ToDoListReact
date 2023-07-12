import { useContext } from "react";
import { useItemsDispatch } from "../Context/ItemsContext";
import { ThemeContext } from "../Context/ThemeContext";
import MyButton from "./MyButton";
import "../styles/dark/taskBg.css";
import "../styles/light/taskBg.css";
import "../styles/dark/taskNumber.css";
import "../styles/light/taskNumber.css";
import "../styles/dark/taskText.css";
import "../styles/light/taskText.css";
import "../styles/dark/button-in-item.css";
import "../styles/light/button-in-item.css";

export default function Item({ item, index }) {
  const dispatch = useItemsDispatch();
  const theme = useContext(ThemeContext);

  return (
    <div className={"taskBg-" + theme}>
      <div className={item.completed ? "completed" : null}>
        <span className={"taskNumber-" + theme}>{index + 1}</span>
        <span className={"taskText-" + theme}>{item.title}</span>
      </div>
      <div className="iconsWrap">
        <MyButton
          buttonClassName={"button_in_item-" + theme}
          name={item.completed ? "uncompleted" : "completed"}
          handleClick={() => {
            dispatch({
              type: "changed",
              item: item,
            });
          }}
        ></MyButton>
        <MyButton
          buttonClassName={"button_in_item-" + theme}
          name="Delete"
          handleClick={() => {
            dispatch({
              type: "deleted",
              id: item.id,
            });
          }}
        ></MyButton>
      </div>
    </div>
  );
}
