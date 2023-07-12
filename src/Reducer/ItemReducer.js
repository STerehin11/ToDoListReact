import {
  deleteItemOnServer,
  postNewItem,
  updateItemOnServer,
} from "../API/api";

export default function itemReducer(items, action) {
  switch (action.type) {
    case "add": {
      let maxId = 0;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id > maxId) {
          maxId = items[i].id;
        }
      }
      var newItem = {
        userId: 0,
        id: ++maxId,
        title: action.title,
        completed: false,
      };
      postNewItem(newItem);
      return [...items, newItem];
    }
    case "changed": {
      return items.map((item) => {
        console.log(item.id);
        if (item.id === action.item.id) {
          item.completed = !item.completed;
          updateItemOnServer(item);
          return action.item;
        } else {
          return item;
        }
      });
    }
    case "deleted": {
      deleteItemOnServer(action.id);
      return items.filter((t) => t.id !== action.id);
    }
    case "getPost": {
      return action.fetchingData;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
