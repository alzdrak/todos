import { Action } from "redux";

//todo model
export interface Todo {
  id: string;
  text: string;
}

//action keys
export enum TodoActionTypes {
  ADD_TODO = "todo/ADD_TODO",
  REMOVE_TODO = "todo/REMOVE_TODO"
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface TodoState {
  //readonly todos: ReadonlyArray<Todo>;
  readonly todos: Todo[];
  readonly errors?: string;
  //readonly loading: boolean;
}

//add todo action interface
export interface IAddTodoAction extends Action {
  type: typeof TodoActionTypes.ADD_TODO;
  text: string;
}

//remove todo action interface
export interface IRemoveTodoAction extends Action {
  type: typeof TodoActionTypes.REMOVE_TODO;
  id: number;
}

// export const add: ActionCreator<IAddTodoAction> = (text: string) => ({
//   type: TodoActionTypes.ADD_TODO,
//   text: text
// })

export type TodoAction = IAddTodoAction | IRemoveTodoAction;
