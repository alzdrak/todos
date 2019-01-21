import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Box, Heading, Text, Button } from "grommet";
// @ts-ignore
import { Add } from "grommet-icons";
import { toggleMenu, openMenu } from "../store/menu/actions";
import { ApplicationState } from "../store/reducers";

const AppBar = (props: any) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="header"
    color="header-text"
    pad={{ left: "medium", right: "small", vertical: "medium" }}
    elevation="small"
    style={{ zIndex: "1" }}
    {...props}
  />
);

interface PropsFromState {
  opened: boolean;
  editable: boolean;
}

interface PropsFromDispatch {
  openMenu: typeof openMenu;
  toggleMenu: typeof toggleMenu;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch;

class Header extends React.Component<AllProps> {
  private toggle = () => {
    //dispatch toggle menu action
    if (this.props.opened) {
      if (this.props.editable) {
        this.props.toggleMenu(this.props.editable); //close as editable
        setTimeout(() => this.props.openMenu(false), 400); //open as not editable
      } else {
        this.props.toggleMenu(this.props.editable); //toggle menu
      }
    } else {
      this.props.openMenu(false); //open menu editable
    }
  };

  render() {
    return (
      <AppBar>
        <Heading level="3" margin="none">
          🕒 <Text style={{ fontStyle: "italic" }}>Todos</Text>
        </Heading>
        <Button
          icon={<Add />}
          onClick={this.toggle}
          style={{ marginRight: "15px" }}
        />
      </AppBar>
    );
  }
}

const mapStateToProps = ({ menu }: ApplicationState) => ({
  opened: menu.opened,
  editable: menu.editable
});

// constraining the actions to the connected component.
// accessible via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  openMenu: (editable: boolean) => dispatch(openMenu(editable)),
  toggleMenu: (editable: boolean) => dispatch(toggleMenu(editable, ""))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
