import "./App.css";
import "./styles/dark/app.css";
import "./styles/dark/main-content.css";
import "./styles/light/app.css";
import "./styles/light/main-content.css";
import React, { useState } from "react";
import AddItemForm from "./components/AddItemForm";
import MySelect from "./components/MySelect";
import ListItem from "./components/ListItem";
import { ThemeContext } from "./Context/ThemeContext";
import { ItemsProvider } from "./Context/ItemsContext";

function App() {
  const [theme, setTheme] = useState("light");
  const [selectedSort, setSelectedSort] = useState("id");
  const [filterValue, setFilterValue] = useState("all");

  const sortItems = (sort) => {
    setSelectedSort(sort);
  };

  const filterItems = (filter) => {
    setFilterValue(filter);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <ItemsProvider>
        <div className={"App-" + theme}>
          <div className="container">
            <div className={"main-content-" + theme}>
              <h2>ToDo List</h2>
              <AddItemForm />
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
              <ListItem selectedSort={selectedSort} filterValue={filterValue} />
            </div>
          </div>
        </div>
      </ItemsProvider>
    </ThemeContext.Provider>
  );
}

export default App;
