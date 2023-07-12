import React, { useContext, useEffect, useReducer } from "react";
import MyButton from "./MyButton";
import { useMemo } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import "../styles/dark/taskBg.css";
import "../styles/light/taskBg.css";
import "../styles/dark/taskNumber.css";
import "../styles/light/taskNumber.css";
import "../styles/dark/taskText.css";
import "../styles/light/taskText.css";
import "../styles/dark/button-in-item.css";
import "../styles/light/button-in-item.css";

const ListItem = ({
  listItems,
  onDeleteTask,
  onMarkCompleted,
  selectedSort,
  filterValue,
}) => {
  const theme = useContext(ThemeContext);

  const todos = useMemo(() => {
    return filterTodos(listItems, selectedSort, filterValue);
  }, [selectedSort, listItems, filterValue]);

  function sortTodos(todos, sortType) {
    switch (sortType) {
      case "id": {
        return [...todos].sort((a, b) => a.id - b.id);
      }
      case "name": {
        return [...todos].sort((a, b) => a.title.localeCompare(b.title));
      }
      default: {
        throw Error("Unknown sortType");
      }
    }
  }

  function filterTodos(todos, sortType, filterType) {
    switch (filterType) {
      case "all": {
        return sortTodos(todos, sortType);
      }
      case "completed": {
        let newArray = [];
        for (var i = 0; i < todos.length; i++) {
          if (todos[i].completed === true) {
            newArray.push(todos[i]);
          }
        }
        return sortTodos(newArray, sortType);
      }
      case "active": {
        let newArray = [];
        for (var j = 0; j < todos.length; j++) {
          if (todos[j].completed === false) {
            newArray.push(todos[j]);
          }
        }
        return sortTodos(newArray, sortType);
      }
      default: {
        throw Error("Unknown filterType");
      }
    }
  }

  return (
    <>
      {todos &&
        todos.map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className={"taskBg-" + theme}>
                <div className={task.completed ? "completed" : null}>
                  <span className={"taskNumber-" + theme}>{index + 1}</span>
                  <span className={"taskText-" + theme}>{task.title}</span>
                </div>
                <div className="iconsWrap">
                  <MyButton
                    buttonClassName={"button_in_item-" + theme}
                    name={task.completed ? "uncompleted" : "completed"}
                    handleClick={() => {
                      console.log("listItem");
                      onMarkCompleted(task);
                    }}
                  ></MyButton>
                  <MyButton
                    buttonClassName={"button_in_item-" + theme}
                    name="Delete"
                    handleClick={() => onDeleteTask(task.id)}
                  ></MyButton>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </>
  );
};

export default ListItem;
