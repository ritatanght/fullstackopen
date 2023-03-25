import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `Anecdote "${action.payload.content}" voted`;
    case "NEW":
      return `"${action.payload.content}" added`;
    case "CLEAR":
      return "";
    case "ERROR":
      return action.payload.error;
    default:
      return state;
  }
};

const AnecdoteContext = createContext();

export const AnecdoteContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );
  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  );
};

export default AnecdoteContext;
