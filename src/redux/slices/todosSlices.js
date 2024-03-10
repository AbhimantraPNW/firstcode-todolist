import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [
      { title: "Create Guest Experience mobile check-in", isDone: false },
      { title: "Document current CI/CD process", isDone: false },
      { title: "Perform Code Review for final Pillow-Talk release", isDone: false },
      { title: "Implement new Color Palette from Design Team", isDone: false },
      { title: "Fix image uploading process for guest check-in", isDone: false },
      { title: "Provide on boarding documentation", isDone: false },
    ],
  },

  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const indexToDelete = action.payload;
      state.todos.splice(indexToDelete, 1);
    },
    updateTodoStatus: (state, action) => {
      const { index, isDone } = action.payload;
      state.todos[index].isDone = isDone;
    },
  },
});

export const { addTodo, deleteTodo, updateTodoStatus } = todosSlice.actions;

export default todosSlice.reducer;