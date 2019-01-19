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

const todoReducer: Reducer<TodoState> = (
  state: TodoState = initialState,
  action: any //TODO: type safe the actions to TodoAction
) => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      const newState = {
        todos: [...state.todos, { id: uuid(), text: action.text }],
        errors: undefined
      };
      return newState;
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
