import { Action } from "redux";

//todo model
export interface Todo {
  id: string;
  text: string;
}

//action keys
export enum TodoActionTypes {
  ADD_TODO = "todo/ADD_TODO",
  EDIT_TODO = "todo/EDIT_TODO",
  REMOVE_TODO = "todo/REMOVE_TODO"
}

// `readonly` modifier to get compile time immutability.
export interface TodoState {
  readonly todos: Todo[];
  readonly errors?: string;
  //readonly loading: boolean;
}

//add todo action interface
export interface IAddTodoAction extends Action {
  type: typeof TodoActionTypes.ADD_TODO;
  text: string;
}

//edit todo action interface
export interface IEditTodoAction extends Action {
  type: typeof TodoActionTypes.EDIT_TODO;
  id: string;
  text: string;
}

//remove todo action interface
export interface IRemoveTodoAction extends Action {
  type: typeof TodoActionTypes.REMOVE_TODO;
  id: string;
}

export type TodoAction = IAddTodoAction | IEditTodoAction | IRemoveTodoAction;
