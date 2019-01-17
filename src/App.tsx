import React from "react";
import {
  Anchor,
  Box,
  Button,
  Collapsible,
  Heading,
  Menu,
  Grid,
  Text,
  FormField,
  TextInput,
  TextArea,
  Grommet,
  Layer,
  ResponsiveContext
} from "grommet";
// @ts-ignore
import { FormClose, Notification, Close, Add, More } from "grommet-icons";

import Header from "./components/header";
import Main from "./components/main";
import NewNote from "./components/new-note";

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

const theme = {
  global: {
    colors: {
      header: "#48ffe7",
      "header-text": "#000"
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
      style: "italic"
    }
  },
  menu: {
    extend: {
      padding: "10px"
    }
  },
  button: {
    padding: {
      vertical: "22px"
    },
    extend: {
      fontWeight: "900"
    }
  }
};

class App extends React.Component {
  state = {
    showSidebar: false
  };

  open = () => this.setState({ showSidebar: true });

  close = () => this.setState({ showSidebar: false });

  toggle = () => this.setState({ showSidebar: !this.state.showSidebar });

  render() {
    const { showSidebar } = this.state;
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <Header toggle={this.toggle} />
              <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
                <Main size={size} />
                <NewNote show={showSidebar} size={size} toggle={this.toggle} />
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default App;
