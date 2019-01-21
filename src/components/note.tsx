import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Box, Text, Button, Menu, Grid } from "grommet";
// @ts-ignore
import { Close, More } from "grommet-icons";
import { toggleMenu, openMenu } from "../store/menu/actions";
import { removeTodo } from "../store/todo/actions";
import { ApplicationState } from "../store/reducers";

interface NoteProps {
  id: string;
  text: string;
  size: string;
}

interface StateFromProps {
  opened: boolean;
  editable: boolean;
  todoIdForEdit: string;
}

interface PropsFromDispatch {
  removeTodo: typeof removeTodo;
  openMenu: typeof openMenu;
  toggleMenu: typeof toggleMenu;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = StateFromProps & PropsFromDispatch & NoteProps;

class Note extends React.Component<AllProps> {
  private remove = () => {
    //if the menu is opened (and editable)
    if (this.props.opened && this.props.editable) {
      //if the current note thats getting deleted matches store
      if (this.props.todoIdForEdit === this.props.id) {
        //close menu
        this.props.toggleMenu(this.props.editable, this.props.todoIdForEdit);
      }
    }
    //dispatch action to remove todo item
    this.props.removeTodo(this.props.id);
  };

  private select = () => {
    //dispatch toggle menu action
    if (this.props.opened) {
      if (!this.props.editable) {
        this.props.toggleMenu(this.props.editable); //close as not editable
        setTimeout(() => this.props.openMenu(true, this.props.id), 400);
      } else {
        //already have a item open - same one then just close
        if (this.props.todoIdForEdit === this.props.id) {
          this.props.toggleMenu(this.props.editable, this.props.id); //toggle editable menu
        } else {
          //else close current one then open new todo item
          this.props.toggleMenu(this.props.editable); //close current note
          setTimeout(() => this.props.openMenu(true, this.props.id), 400);
        }
      }
    } else {
      this.props.openMenu(true, this.props.id); //open menu editable
    }
  };

  render() {
    return (
      <Box
        pad="medium"
        width="large"
        height="xsmall"
        align="center"
        background={{ color: "light-2", opacity: "strong" }}
        round
        gap="small"
        responsive={true}
        className="animate fadeInUp"
      >
        <Grid
          fill
          areas={[
            { name: "left", start: [0, 0], end: [0, 0] },
            { name: "main", start: [1, 0], end: [1, 0] },
            { name: "right", start: [2, 0], end: [2, 0] }
          ]}
          columns={["50px", "flex", "50px"]}
          rows={["flex"]}
          gap="small"
        >
          <Box gridArea="left" align="center" justify="center">
            <Button icon={<Close />} hoverIndicator onClick={this.remove} />
          </Box>
          <Box
            gridArea="main"
            align="start"
            justify="center"
            style={{ overflow: "hidden" }}
          >
            <Text
              alignSelf="start"
              onClick={this.select}
              style={{ cursor: "pointer" }}
            >
              {this.props.text}
            </Text>
            {/* {size !== "small" ? <Text alignSelf="end">Cubes</Text> : null} */}
          </Box>
          <Box gridArea="right" align="end" justify="center">
            <Menu
              icon={<More />}
              dropAlign={{ right: "right", top: "bottom" }}
              items={[
                { label: "Edit", onClick: this.select },
                // { label: "Complete", href: "#" },
                { label: "Delete", onClick: this.remove }
              ]}
              size="xlarge"
            />
          </Box>
        </Grid>
      </Box>
    );
  }
}

// constraining the actions to the connected component.
// accessible via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeTodo: (id: string) => dispatch(removeTodo(id)),
  openMenu: (editable: boolean, text: string) =>
    dispatch(openMenu(editable, text)),
  toggleMenu: (editable: boolean) => dispatch(toggleMenu(editable))
});

const mapStateToProps = ({ menu }: ApplicationState) => ({
  opened: menu.opened,
  editable: menu.editable,
  todoIdForEdit: menu.todoIdForEdit
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
