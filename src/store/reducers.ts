import { combineReducers } from "redux";
import todoReducer from "./todo/reducer";
import { TodoState } from "./todo/types";

const rootReducer = combineReducers({
  todo: todoReducer
});

export default rootReducer;

//export type AppState = ReturnType<typeof rootReducer>;

// The top-level state object
export interface ApplicationState {
  todo: TodoState;
}
