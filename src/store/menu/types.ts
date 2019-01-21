import { Action } from "redux";

//action keys
export enum MenuActionTypes {
  OPEN_MENU = "menu/OPEN",
  CLOSE_MENU = "menu/CLOSE",
  TOGGLE_MENU = "menu/TOGGLE"
}

//`readonly` modifier to get compile time immutability.
export interface MenuState {
  readonly opened: boolean;
  readonly editable: boolean;
  readonly todoIdForEdit: string; //editing the note
  //readonly text: string; //editing the note
}

//open menu action interface
export interface IOpenMenuAction extends Action {
  type: typeof MenuActionTypes.OPEN_MENU;
  editable: boolean;
  todoIdForEdit: string;
}

//close menu action interface
export interface ICloseMenuAction extends Action {
  type: typeof MenuActionTypes.CLOSE_MENU;
}

//toggle menu action interface
export interface IToggleMenuAction extends Action {
  type: typeof MenuActionTypes.TOGGLE_MENU;
  editable: boolean;
  todoIdForEdit: string;
}

export type MenuAction = IOpenMenuAction | ICloseMenuAction | IToggleMenuAction;
