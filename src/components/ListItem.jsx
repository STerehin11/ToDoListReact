import React, { useEffect } from "react";
import MyButton from "./MyButton";
import { useMemo } from "react";
import useData from "../Hooks/useData";

const ListItem = ({ listItems, setToDo, selectedSort }) => {
  const sortedTodos = useMemo(() => {
    return filterTodos(listItems, selectedSort);
  }, [selectedSort, listItems]);

  function filterTodos(todos, sortType) {
    var newArray = [];
    if (sortType === "id") {
      return [...todos].sort((a, b) => a.id - b.id);
    } else if (selectedSort === "name") {
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === "all") {
    } else if (sortType === "completed") {
      newArray = [];
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].completed === true) {
          newArray.push(todos[i]);
        }
      }
      return newArray;
    } else if (sortType === "active") {
      newArray = [];
      for (var j = 0; j < todos.length; j++) {
        if (todos[j].completed === false) {
          newArray.push(todos[j]);
        }
      }
      return newArray;
    }
  }

  const deleteItem = (id) => {
    deleteItemOnServer(id);
    let newTasks = listItems.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  const markCompleted = (id) => {
    let newTasks = listItems.map((task) => {
      if (task.id === id) {
        var updatedTask = { ...task, completed: !task.completed };
        updateItemOnServer(updatedTask);
        return updatedTask;
      }
      return task;
    });
    setToDo(newTasks);
  };

  function deleteItemOnServer(deletedItemId) {
    fetch("https://jsonplaceholder.typicode.com/todos/" + deletedItemId, {
      method: "DELETE",
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

  function updateItemOnServer(updateItem) {
    fetch("https://jsonplaceholder.typicode.com/todos/1", {
      method: "PUT",
      body: JSON.stringify({ updateItem }),
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
      {sortedTodos &&
        sortedTodos.map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className="taskBg">
                <div className={task.completed ? "completed" : null}>
                  <span className="taskNumber">{index + 1}</span>
                  <span className="taskText">{task.title}</span>
                </div>
                <div className="iconsWrap">
                  <MyButton
                    buttonClassName="button_in_item"
                    name={task.completed ? "uncompleted" : "completed"}
                    handleClick={() => markCompleted(task.id)}
                  ></MyButton>
                  <MyButton
                    buttonClassName="button_in_item"
                    name="Delete"
                    handleClick={() => deleteItem(task.id)}
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
