import "./App.css";
import React, { useState, useEffect } from "react";

import AddItemForm from "./components/AddItemForm";
import MySelect from "./components/MySelect";
import ListItem from "./components/ListItem";

function App() {
  const [listItems, setItem] = useState([]);
  const [selectedSort, setSelectedSort] = useState("id");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then(
        (result) => {
          setItem(result);
        },
        (error) => {
          alert(error);
        }
      );
  }, []);

  const sortTodos = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <div className="App">
      {
        <div className="container">
          <div className="main-content">
            <h2>ToDo List</h2>
            <AddItemForm
              listItems={listItems}
              newItem={newTask}
              setNewItem={setNewTask}
              setItem={setItem}
            />
            <MySelect
              value={selectedSort}
              onChange={sortTodos}
              defaultValue="Sort"
              options={[
                { value: "id", name: "Id sort" },
                { value: "completed", name: "Completed" },
                { value: "active", name: "Active" },
                { value: "name", name: "Name sort" },
              ]}
            />
            <ListItem
              selectedSort={selectedSort}
              listItems={listItems}
              setToDo={setItem}
            />
          </div>
        </div>
      }
    </div>
  );
}

export default App;
