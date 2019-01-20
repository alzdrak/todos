import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Box, Grid } from "grommet";

import { Todo } from "../store/todo/types";
import { removeTodo } from "../store/todo/actions";
import { ApplicationState } from "../store/reducers";
import Note from "./note";

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
  //toggle: React.FormEventHandler;
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

  private removeTodo = (id: string) => {
    //dispatch the action
    this.props.removeTodo(id);
  };

  renderTodos(size: string) {
    const { todos } = this.props;
    let animateDelayStep = 0.2;
    return (
      <>
        {todos.map((todo, index) => {
          return (
            <React.Fragment key={todo.id}>
              {todos.length > 0 ? (
                <div
                  style={{
                    WebkitFlex: "0 0 auto",
                    MsFlex: "0 0 auto",
                    flex: "0 0 auto",
                    height: "24px"
                  }}
                />
              ) : null}

              <Note
                id={todo.id}
                text={todo.text}
                size={size}
                remove={this.removeTodo}
                animateDelay={index * animateDelayStep}
              />
              {/* remove={this.removeTodo} */}
              {/* <div key={todo.id}>{todo.text}</div> */}
            </React.Fragment>
          );
        })}
      </>
    );
  }

  render() {
    const { size } = this.props;
    return (
      <Box flex align="center" justify="center">
        {size !== "small" ? (
          <Box justify="center" align="center" pad="medium">
            {this.renderTodos(size)}
          </Box>
        ) : (
          <Box
            direction="row-responsive"
            justify="center"
            align="center"
            pad="medium"
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
  removeTodo: (id: string) => dispatch(removeTodo(id))
});

// single context at a time in a connected component.
// Can always include multiple contexts. Just remember
// to separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ todo }: ApplicationState) => ({
  todos: todo.todos,
  errors: todo.errors
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
