import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Box, Grid } from "grommet";
import { Transition, animated } from "react-spring";

import { Todo } from "../store/todo/types";
import { removeTodo } from "../store/todo/actions";
import { ApplicationState } from "../store/reducers";
import Note from "./note";
import { openMenu } from "../store/menu/actions";

//Essentially props from TodoState (copied to new interface)
interface PropsFromState {
  todos: ReadonlyArray<Todo>;
  errors?: string;
}

interface PropsFromDispatch {
  removeTodo: typeof removeTodo;
}

interface OwnProps {
  size: string;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class Main extends React.Component<AllProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      text: ""
    };
  }

  private selectTodo = (id: string) => {
    //dispatch select action
  };

  private removeTodo = (id: string) => {
    //dispatch the action
    this.props.removeTodo(id);
  };

  renderTodos(size: string) {
    const { todos } = this.props;
    let animateDelayStep = 0.2;
    const newTodos = todos as Todo[];
    return (
      <>
        <Transition
          items={newTodos}
          keys={todo => todo.id}
          from={{ opacity: 0, transform: "translate3d(0,40px,0)" }}
          enter={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          leave={{ opacity: 0, transform: "translate3d(0,40px,0)" }}
        >
          {(todo, state, index) => props => (
            <Box key={todo.id} style={{ ...props }}>
              {index > 0 ? (
                <div
                  style={{
                    WebkitFlex: "0 0 auto",
                    MsFlex: "0 0 auto",
                    flex: "0 0 auto",
                    height: "24px"
                  }}
                />
              ) : null}
              <Note id={todo.id} text={todo.text} size={size} />
            </Box>
          )}
        </Transition>
      </>
    );
  }

  // <div key={todo.id} style={{ ...props }}></div>
  // </div>

  render() {
    const { size } = this.props;
    return (
      <Box flex align="center" justify="center">
        {size !== "small" ? (
          <Box
            justify="center"
            align="center"
            pad="medium"
            style={{ display: "block" }}
          >
            {this.renderTodos(size)}
          </Box>
        ) : (
          <Box
            direction="row-responsive"
            justify="center"
            align="center"
            pad="medium"
            style={{ display: "block" }}
          >
            {this.renderTodos(size)}
          </Box>
        )}
      </Box>
    );
  }
}

// constraining the actions to the connected component.
// accessible via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeTodo: (id: string) => dispatch(removeTodo(id)),
  openMenu: () => dispatch(openMenu())
});

// single context at a time in a connected component.
// Can always include multiple contexts. Just remember
// to separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ todo, menu }: ApplicationState) => ({
  todos: todo.todos,
  errors: todo.errors
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
