import { createContext, useEffect, useReducer, useContext } from "react";
import itemReducer from "../Reducer/ItemReducer";
import loadingReducer from "../Reducer/LoadingReducer";

export const ItemsContext = createContext(null);
export const ItemsDispatchContext = createContext(null);

export function ItemsProvider({ children }) {
  const [listItems, dispatch] = useReducer(itemReducer, []);
  const [isLoading, loadingDispatch] = useReducer(loadingReducer, true);

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

  return (
    <ItemsContext.Provider value={[listItems, isLoading]}>
      <ItemsDispatchContext.Provider value={dispatch}>
        {children}
      </ItemsDispatchContext.Provider>
    </ItemsContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemsContext);
}

export function useItemsDispatch() {
  return useContext(ItemsDispatchContext);
}
