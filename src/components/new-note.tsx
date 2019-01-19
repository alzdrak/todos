import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { TodoState, Todo } from "../store/todo/types";
import { ApplicationState } from "../store/reducers";

import { addTodo } from "../store/todo/actions";

import {
  Box,
  Button,
  Collapsible,
  Heading,
  FormField,
  TextArea,
  Layer
} from "grommet";
// @ts-ignore
import { Close, Add } from "grommet-icons";

interface IState {
  note: string;
}

//Essentially props from TodoState (copied to new interface)
interface PropsFromState {
  todos: ReadonlyArray<Todo>;
  errors?: string;
}

interface PropsFromDispatch {
  addTodo: typeof addTodo;
}

interface OwnProps {
  show: boolean;
  size: string;
  toggle: React.FormEventHandler;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class NewNote extends React.Component<AllProps, IState> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      note: ""
    };
  }

  /**
   * React.FormEvent<HTMLTextAreaElement> or React.ChangeEvent<HTMLTextAreaElement>
   * since the listener is attached to element, can use currentTarget or target
   *  */
  private onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ note: e.currentTarget.value });
  };

  private addTodo = (e: React.FormEvent) => {
    //stop propagation to submit form (eg refresh)
    e.preventDefault();

    //dispatch the action
    this.props.addTodo(this.state.note);

    //toggle the add note slider
    this.props.toggle(e);

    //console.log("add todo - state", this.state);
    console.log("this", this);
  };

  render() {
    const { size, show, toggle } = this.props;

    return (
      <>
        {!show || size !== "small" ? (
          <Collapsible direction="horizontal" open={show}>
            <Box
              flex
              width="medium"
              background="light-2"
              elevation="small"
              align="center"
              justify="center"
            >
              <Box
                as="form"
                fill="vertical"
                overflow="auto"
                onSubmit={this.addTodo}
                background="light-2"
                tag="header"
                pad="large"
              >
                <Box flex={false} direction="row" justify="between">
                  <Heading level="2" margin="none">
                    Add a New Note
                  </Heading>
                  <Button icon={<Close />} onClick={toggle} />
                </Box>

                <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                  <FormField label="Note">
                    <TextArea
                      plain={false}
                      resize={false}
                      style={{ fontSize: "20px", fontWeight: "normal" }}
                      placeholder="What's on your mind?"
                      onChange={this.onChange}
                    />
                  </FormField>
                </Box>
                <Box flex={false} as="footer" align="start">
                  <Button
                    type="submit"
                    label="Submit"
                    icon={<Add />}
                    color="accent-3"
                    primary
                    fill
                  />
                </Box>
              </Box>
            </Box>
          </Collapsible>
        ) : (
          <Layer
            position="right"
            full="vertical"
            onClickOutside={toggle}
            onEsc={toggle}
          >
            <Box
              as="form"
              fill="vertical"
              overflow="auto"
              onSubmit={this.addTodo}
              background="light-2"
              tag="header"
              pad="large"
            >
              <Box flex={false} direction="row" justify="between">
                <Heading level="2" margin="none">
                  Add a New Note
                </Heading>
                <Button icon={<Close />} onClick={toggle} />
              </Box>

              <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                <FormField label="Note">
                  <TextArea
                    plain={false}
                    resize={false}
                    style={{ fontSize: "20px", fontWeight: "normal" }}
                    onChange={this.onChange}
                  />
                </FormField>
              </Box>
              <Box flex={false} as="footer" align="start">
                <Button
                  type="submit"
                  label="Submit"
                  icon={<Add />}
                  color="accent-3"
                  primary
                  fill
                />
              </Box>
            </Box>
          </Layer>
        )}
      </>
    );
  }
}

// constraining the actions to the connected component.
// accessible via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTodo: (text: string) => dispatch(addTodo(text))
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
)(NewNote);
