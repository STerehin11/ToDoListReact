export default function loadingReducer(items, action) {
  switch (action.type) {
    case "true": {
      return true;
    }
    case "false": {
      return false;
    }
    default: {
      throw Error("Unknown action in loadingReducer: " + action.type);
    }
  }
}
