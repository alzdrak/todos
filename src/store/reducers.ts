import { combineReducers } from "redux";
import todoReducer from "./todo/reducer";
import { TodoState } from "./todo/types";
import { MenuState } from "./menu/types";
import menuReducer from "./menu/reducer";

const rootReducer = combineReducers({
  todo: todoReducer,
  menu: menuReducer
});

export default rootReducer;

//export type AppState = ReturnType<typeof rootReducer>;

// The top-level state object
export interface ApplicationState {
  todo: TodoState;
  menu: MenuState;
}
