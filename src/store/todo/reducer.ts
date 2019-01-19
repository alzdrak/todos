import { Reducer, Action } from "redux";
import { TodoState, TodoActionTypes, Todo, TodoAction } from "./types";

// Type-safe initialState!
const initialState: TodoState = {
  todos: [], //empty todos
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
        todos: [
          ...state.todos,
          { id: Date.now() + Math.random(), text: action.text }
        ],
        errors: undefined
      };
      console.log("reducer add_todo", newState);
      return newState;
    case TodoActionTypes.REMOVE_TODO:
      return {
        //todos: [...state.todos, { id: Math.random(), text: action.text }],
        todos: [...state.todos],
        errors: undefined
      };
    default:
      return state;
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export default todoReducer;
