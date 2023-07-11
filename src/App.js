import "./App.css";
import React, { useState, useEffect } from "react";

import AddItemForm from "./components/AddItemForm";
import MySelect from "./components/MySelect";
import ListItem from "./components/ListItem";
import useData from "./Hooks/useData";

function App() {
  const [listItems, setItem] = useState([]);
  const [selectedSort, setSelectedSort] = useState("id");
  const [newTask, setNewTask] = useState("");

  const { data, loading, error } = useData();

  const checkData = (data) => {
    data && setItem(data);
    error && alert(error);
  };

  useEffect(() => {
    checkData(data);
  }, [data, error]);

  const sortItems = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <div className="App">
      {
        <div className="container">
          <div className="main-content">
            <h2>ToDo List</h2>
            <AddItemForm
              listItems={listItems && listItems}
              newItem={newTask}
              setNewItem={setNewTask}
              setItem={setItem}
            />
            <MySelect
              value={selectedSort}
              onChange={sortItems}
              defaultValue="Sort"
              options={[
                { value: "id", name: "All" },
                { value: "completed", name: "Completed" },
                { value: "active", name: "Active" },
                { value: "name", name: "Name sort" },
              ]}
            />
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              <ListItem
                selectedSort={selectedSort}
                listItems={listItems && listItems}
                setToDo={setItem}
              />
            )}
          </div>
        </div>
      }
    </div>
  );
}

export default App;
