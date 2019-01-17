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

                {/* <Box flex align="center" justify="center">
                  <Box
                    flex
                    direction="row-responsive"
                    justify="center"
                    align="center"
                    pad="medium"
                    gap="medium"
                    responsive={true}
                  >
                    <Box
                      pad="medium"
                      width="large"
                      height="xsmall"
                      align="center"
                      background={{ color: "light-2", opacity: "strong" }}
                      round
                      gap="small"
                      responsive={true}
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
                          <Button
                            icon={<Close />}
                            hoverIndicator
                            onClick={() => {}}
                          />
                        </Box>
                        <Box
                          gridArea="main"
                          align="start"
                          justify="center"
                          style={{ overflow: "hidden" }}
                        >
                          <Text alignSelf="start">Take car for a service</Text>
                          {size !== "small" ? (
                            <Text alignSelf="end">Cubes</Text>
                          ) : null}
                        </Box>
                        <Box gridArea="right" align="end" justify="center">
                          <Menu
                            icon={<More />}
                            dropAlign={{ right: "right", top: "bottom" }}
                            items={[
                              { label: "Edit", href: "#" },
                              { label: "Complete", href: "#" },
                              { label: "Delete", href: "#" }
                            ]}
                            size="xlarge"
                          />
                        </Box>
                      </Grid>
                    </Box>
                  </Box>
                </Box> */}

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
