// src/redux/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchTodosRequest(state) {
            state.loading = true;
        },
        fetchTodosSuccess(state, action) {
            state.loading = false;
            state.todos = action.payload;
        },
        fetchTodosFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addTodoRequest(state, action) { },
        addTodoSuccess(state, action) {
            state.todos.push(action.payload);
        },
        addTodoFailure(state, action) {
            state.error = action.payload;
        },
        updateTodoRequest(state, action) { },
        updateTodoSuccess(state, action) {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        },
        updateTodoFailure(state, action) {
            state.error = action.payload;
        },
        deleteTodoRequest(state, action) { },
        deleteTodoSuccess(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        deleteTodoFailure(state, action) {
            state.error = action.payload;
        },
    },
});

export const {
    fetchTodosRequest,
    fetchTodosSuccess,
    fetchTodosFailure,
    addTodoRequest,
    addTodoSuccess,
    addTodoFailure,
    updateTodoRequest,
    updateTodoSuccess,
    updateTodoFailure,
    deleteTodoRequest,
    deleteTodoSuccess,
    deleteTodoFailure,
} = todoSlice.actions;

export default todoSlice.reducer;