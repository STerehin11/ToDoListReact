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

export function filterTodos(todos, sortType, filterType) {
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
