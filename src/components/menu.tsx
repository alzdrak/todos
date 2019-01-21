import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
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

import { ApplicationState } from "../store/reducers";
import { Todo } from "../store/todo/types";
import { addTodo, editTodo } from "../store/todo/actions";
import { toggleMenu } from "../store/menu/actions";

interface IState {
  note: string;
}

//Essentially props from TodoState (copied to new interface)
interface PropsFromState {
  todos: ReadonlyArray<Todo>;
  errors?: string;
  opened: boolean;
  editable: boolean;
  todoIdForEdit: string;
}

interface PropsFromDispatch {
  addTodo: typeof addTodo;
  editTodo: typeof editTodo;
  toggleMenu: typeof toggleMenu;
}

interface OwnProps {
  size: string;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class Menu extends React.Component<AllProps, IState> {
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
    this.props.toggleMenu(false, "");

    //clear todo input
    this.setState({ note: "" });
  };

  private editTodo = (e: React.FormEvent) => {
    //stop propagation to submit form (eg refresh)
    e.preventDefault();

    //dispatch the action
    this.props.editTodo(this.props.todoIdForEdit, this.state.note);

    //toggle the add note slider
    this.props.toggleMenu(false, "");

    //clear todo input
    this.setState({ note: "" });
  };

  componentDidUpdate(prevProps: AllProps, prevState: IState): void {
    if (prevProps.todoIdForEdit !== this.props.todoIdForEdit) {
      let editableTodo = this.props.todos.find(
        todo => todo.id === this.props.todoIdForEdit
      );
      if (editableTodo) {
        this.setState({ note: editableTodo.text });
      } else {
        this.setState({ note: "" });
      }
    }
  }

  render() {
    const { size, opened } = this.props;
    return (
      <>
        {!opened || size !== "small" ? (
          <Collapsible direction="horizontal" open={opened}>
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
                onSubmit={!this.props.editable ? this.addTodo : this.editTodo}
                background="light-2"
                tag="header"
                pad="large"
                style={{ width: "100%" }}
              >
                <Box flex={false} direction="row" justify="between">
                  <Heading level="2" margin="none">
                    {!this.props.editable ? `Add a New Note` : `Edit the Note`}
                  </Heading>
                  <Button icon={<Close />} onClick={this.props.toggleMenu} />
                </Box>

                <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                  <FormField label="Todo">
                    <TextArea
                      plain={false}
                      resize={false}
                      style={{ fontSize: "20px", fontWeight: "normal" }}
                      placeholder="What's on your mind?"
                      onChange={this.onChange}
                      value={this.state.note}
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
            onClickOutside={this.props.toggleMenu}
            onEsc={this.props.toggleMenu}
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
                  {!this.props.editable ? `Add a New Note` : `Edit the Note`}
                </Heading>
                <Button icon={<Close />} onClick={this.props.toggleMenu} />
              </Box>

              <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                <FormField label="Note">
                  <TextArea
                    plain={false}
                    resize={false}
                    style={{ fontSize: "20px", fontWeight: "normal" }}
                    onChange={this.onChange}
                    value={this.state.note}
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
  addTodo: (text: string) => dispatch(addTodo(text)),
  editTodo: (id: string, text: string) => dispatch(editTodo(id, text)),
  toggleMenu: (editable: boolean) => dispatch(toggleMenu(editable, ""))
});

const mapStateToProps = ({ todo, menu }: ApplicationState) => ({
  todos: todo.todos,
  errors: todo.errors,
  opened: menu.opened,
  editable: menu.editable,
  todoIdForEdit: menu.todoIdForEdit
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
