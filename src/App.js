import "./App.css";
import "./styles/dark/app.css";
import "./styles/dark/main-content.css";
import "./styles/light/app.css";
import "./styles/light/main-content.css";

import React, { useState, useEffect, useReducer } from "react";

import AddItemForm from "./components/AddItemForm";
import MySelect from "./components/MySelect";
import ListItem from "./components/ListItem";
import itemReducer from "./Recuder/ItemReducer";
import loadingReducer from "./Recuder/LoadingRedicer";
import { ThemeContext } from "./Context/ThemeContext";

function App() {
  const [theme, setTheme] = useState("light");
  const [listItems, dispatch] = useReducer(itemReducer, []);
  const [isLoading, loadingDispatch] = useReducer(loadingReducer, true);

  const [selectedSort, setSelectedSort] = useState("id");
  const [filterValue, setFilterValue] = useState("all");

  const sortItems = (sort) => {
    setSelectedSort(sort);
  };

  const filterItems = (filter) => {
    setFilterValue(filter);
  };

  const handleGetPost = async () => {
    try {
      loadingDispatch({ type: "true" });
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const json = await response.json();
      dispatch({ type: "getPost", fetchingData: json });
    } catch (error) {
      alert(error);
    } finally {
      loadingDispatch({ type: "false" });
    }
  };

  useEffect(() => {
    handleGetPost();
  }, []);

  function handleAddItem(title) {
    dispatch({
      type: "add",
      title: title,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  function handleCompletedTask(item) {
    console.log("handleCompletedTask");
    dispatch({
      type: "changed",
      item: item,
    });
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className={"App-" + theme}>
        <div className="container">
          <div className={"main-content-" + theme}>
            <h2>ToDo List</h2>
            <AddItemForm onAddItem={handleAddItem} />
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              Toogle theme
            </button>
            <MySelect
              value={filterValue}
              onChange={filterItems}
              options={[
                { value: "all", name: "All" },
                { value: "completed", name: "Completed" },
                { value: "active", name: "Active" },
              ]}
            ></MySelect>
            <MySelect
              value={selectedSort}
              onChange={sortItems}
              options={[
                { value: "id", name: "id" },
                { value: "name", name: "Name sort" },
              ]}
            />
            {isLoading ? (
              <h2>Loading...</h2>
            ) : (
              <ListItem
                listItems={listItems && listItems}
                onDeleteTask={handleDeleteTask}
                onMarkCompleted={handleCompletedTask}
                selectedSort={selectedSort}
                filterValue={filterValue}
              />
            )}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
