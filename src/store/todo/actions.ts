import { ActionCreator } from "redux";
import { IAddTodoAction, IRemoveTodoAction, TodoActionTypes } from "./types";

//add todo item action
export const addTodo: ActionCreator<IAddTodoAction> = (text: string) => {
  const action = {
    type: TodoActionTypes.ADD_TODO,
    text: text
  } as IAddTodoAction;
  console.log("action in addTodo", action);
  return action;
};

//remove todo item action
export const removeTodo: ActionCreator<IRemoveTodoAction> = (id: number) => {
  const action = {
    type: TodoActionTypes.REMOVE_TODO,
    id: id
  } as IRemoveTodoAction;

  console.log("action in removeTodo", action);
  return action;
};
