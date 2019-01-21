import { Reducer, Action } from "redux";
import { MenuState, MenuActionTypes, MenuAction } from "./types";

// Type-safe initialState!
const initialState: MenuState = {
  opened: false, //closed
  editable: false, //new note
  todoIdForEdit: "" //no todo selected
};

const menuReducer: Reducer<MenuState, MenuAction> = (
  state: MenuState = initialState,
  action: MenuAction
) => {
  switch (action.type) {
    case MenuActionTypes.OPEN_MENU:
      return {
        opened: true,
        editable: action.editable,
        todoIdForEdit: action.todoIdForEdit
      };
    case MenuActionTypes.CLOSE_MENU:
      return {
        opened: false,
        editable: false,
        todoIdForEdit: ""
      };
    case MenuActionTypes.TOGGLE_MENU:
      return {
        opened: !state.opened,
        editable: action.editable,
        todoIdForEdit: action.todoIdForEdit
      };
    default:
      return state;
  }
};

export default menuReducer;
