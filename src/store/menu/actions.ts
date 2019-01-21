import { ActionCreator } from "redux";
import {
  IOpenMenuAction,
  ICloseMenuAction,
  IToggleMenuAction,
  MenuActionTypes
} from "./types";

//open menu action
export const openMenu: ActionCreator<IOpenMenuAction> = (
  editable: boolean,
  todoIdForEdit: string
) => {
  return {
    type: MenuActionTypes.OPEN_MENU,
    editable: editable,
    todoIdForEdit: todoIdForEdit
  } as IOpenMenuAction;
};

//close menu action
export const closeMenu: ActionCreator<ICloseMenuAction> = () => {
  return {
    type: MenuActionTypes.CLOSE_MENU,
    text: ""
  } as ICloseMenuAction;
};

//toggle menu action
export const toggleMenu: ActionCreator<IToggleMenuAction> = (
  editable: boolean,
  todoIdForEdit: string
) => {
  return {
    type: MenuActionTypes.TOGGLE_MENU,
    editable: editable,
    todoIdForEdit: todoIdForEdit
  } as IToggleMenuAction;
};
