import { ActionCreator } from "redux";
import {
  IAddTodoAction,
  IRemoveTodoAction,
  TodoActionTypes,
  IEditTodoAction
} from "./types";

//add todo item action
export const addTodo: ActionCreator<IAddTodoAction> = (text: string) => {
  return {
    type: TodoActionTypes.ADD_TODO,
    text: text
  } as IAddTodoAction;
};

//edit todo item action
export const editTodo: ActionCreator<IEditTodoAction> = (
  id: string,
  text: string
) => {
  return {
    type: TodoActionTypes.EDIT_TODO,
    id: id,
    text: text
  };
};

//remove todo item action
export const removeTodo: ActionCreator<IRemoveTodoAction> = (id: string) => {
  return {
    type: TodoActionTypes.REMOVE_TODO,
    id: id
  } as IRemoveTodoAction;
};
