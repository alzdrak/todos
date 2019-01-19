import { ActionCreator } from "redux";
import { IAddTodoAction, IRemoveTodoAction, TodoActionTypes } from "./types";

//add todo item action
export const addTodo: ActionCreator<IAddTodoAction> = (text: string) => {
  return {
    type: TodoActionTypes.ADD_TODO,
    text: text
  } as IAddTodoAction;
};

//remove todo item action
export const removeTodo: ActionCreator<IRemoveTodoAction> = (id: number) => {
  return {
    type: TodoActionTypes.REMOVE_TODO,
    id: id
  } as IRemoveTodoAction;
};
