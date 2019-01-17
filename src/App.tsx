import React, { Component } from "react";
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
  }
};

class App extends Component {
  state = {
    showSidebar: false
  };

  onOpen = () => this.setState({ showSidebar: true });

  onClose = () => {
    this.setState({ showSidebar: false });
  };

  render() {
    const { showSidebar } = this.state;
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level="3" margin="none">
                  🕒 <Text style={{ fontStyle: "italic" }}>Todos</Text>
                </Heading>
                <Button
                  icon={<Add />}
                  onClick={() =>
                    this.setState({ showSidebar: !this.state.showSidebar })
                  }
                />
              </AppBar>
              <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
                <Box flex align="center" justify="center">
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
                          <Text alignSelf="start">
                            This is a long cube text todo list item that should
                            truncate eventually at the end some more text ehre
                          </Text>
                          {/* {size !== "small" ? (
                              <Text alignSelf="end">Cubes</Text>
                            ) : null} */}
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
                </Box>

                {!showSidebar || size !== "small" ? (
                  <Collapsible direction="horizontal" open={showSidebar}>
                    <Box
                      flex
                      width="medium"
                      background="light-2"
                      elevation="small"
                      align="center"
                      justify="center"
                    >
                      sidebar
                    </Box>
                  </Collapsible>
                ) : (
                  <Layer
                    position="right"
                    full="vertical"
                    onClickOutside={this.onClose}
                    onEsc={this.onClose}
                  >
                    <Box
                      as="form"
                      fill="vertical"
                      overflow="auto"
                      onSubmit={this.onClose}
                      background="light-2"
                      tag="header"
                      pad="large"
                    >
                      <Box flex={false} direction="row" justify="between">
                        <Heading level="2" margin="none">
                          Add a New Note
                        </Heading>
                        <Button icon={<Close />} onClick={this.onClose} />
                      </Box>

                      <Box
                        flex="grow"
                        overflow="auto"
                        pad={{ vertical: "medium" }}
                      >
                        <FormField label="Name">
                          <TextInput
                            style={{
                              fontSize: "20px",
                              fontWeight: "normal"
                            }}
                          />
                        </FormField>
                        <FormField label="Note">
                          <TextArea
                            plain={false}
                            resize={false}
                            style={{ fontSize: "20px", fontWeight: "normal" }}
                          />
                        </FormField>
                      </Box>
                      <Box flex={false} as="footer" align="start">
                        <Button
                          type="submit"
                          label="Submit"
                          onClick={this.onClose}
                          primary
                        />
                      </Box>
                    </Box>
                  </Layer>
                )}
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default App;
