export function postNewItem(newEntry) {
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({ newEntry }),
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

export function deleteItemOnServer(deletedItemId) {
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

export function updateItemOnServer(updateItem) {
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
