import React from "react";
import { useMemo } from "react";
import { useItems } from "../Context/ItemsContext";
import { filterTodos } from "./Utils";
import Item from "./Item";

const ListItem = ({ selectedSort, filterValue }) => {
  const [listItems, isLoading] = useItems();

  const todos = useMemo(() => {
    return filterTodos(listItems, selectedSort, filterValue);
  }, [selectedSort, listItems, filterValue]);

  return (
    <>
      {todos &&
        todos.map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              {isLoading ? (
                <h2>Loading...</h2>
              ) : (
                <Item item={task} index={index}></Item>
              )}
            </React.Fragment>
          );
        })}
    </>
  );
};

export default ListItem;
