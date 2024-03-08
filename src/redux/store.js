import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/todosSlices";

export default configureStore({
  reducer: { todos: todosReducer },
});
