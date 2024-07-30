import { createSlice } from "@reduxjs/toolkit";

// Fetch tasks from localStorage or set to an empty array if not found
const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];

const initialState = {
    task: initialTasks
}

export const addTaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.task.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.task));
    },
    deleteTask: (state, action) => {
      state.task = state.task.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.task));
    },
    updateTask: (state, action) => {
      const index = state.task.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.task[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.task));
      }
    },
    markComplete: (state, action) => {
      const index = state.task.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.task[index].isCompleted =  !state.task[index].isCompleted;
        localStorage.setItem('tasks', JSON.stringify(state.task));
      }
    }
  }
})

export const { addTask, deleteTask, updateTask, markComplete } = addTaskSlice.actions;
export default addTaskSlice.reducer;
