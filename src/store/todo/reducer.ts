import { Reducer, Action } from "redux";
import { TodoState, TodoActionTypes, Todo, TodoAction } from "./types";
import uuid from "uuid/v4";

// Type-safe initialState!
const initialState: TodoState = {
  todos: [
    { id: uuid(), text: "🚘 Take car for a service" } as Todo,
    { id: uuid(), text: "Find more henchmen 🐱‍👤" } as Todo,
    { id: uuid(), text: "Take over the world 🌍" } as Todo
  ], //init with 3 todos
  errors: undefined
  //loading: false
};

const todoReducer: Reducer<TodoState, TodoAction> = (
  state: TodoState = initialState,
  action: TodoAction //TODO: type safe the actions to TodoAction
) => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      const newState = {
        todos: [...state.todos, { id: uuid(), text: action.text }],
        errors: undefined
      };
      return newState;
    case TodoActionTypes.EDIT_TODO:
      //copy state (dont mutate this state directly)
      let newTodos = [...state.todos];
      //find index of item to edit
      let index = newTodos.findIndex(todo => todo.id == action.id);
      //update item
      newTodos[index] = { id: action.id, text: action.text };
      //return new state
      return { todos: newTodos, errors: undefined };
    case TodoActionTypes.REMOVE_TODO:
      return {
        todos: state.todos.filter(todo => todo.id !== action.id),
        errors: undefined
      };
    default:
      return state;
  }
};

export default todoReducer;
