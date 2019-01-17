import React, { Component } from "react";
import { Box, Heading, Text, Button } from "grommet";
// @ts-ignore
import { Add } from "grommet-icons";

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

interface IProps {
  toggle: Function;
  children?: any;
}

const Header = (props: IProps) => (
  <AppBar>
    <Heading level="3" margin="none">
      🕒 <Text style={{ fontStyle: "italic" }}>Todos</Text>
    </Heading>
    <Button icon={<Add />} onClick={() => props.toggle()} />
  </AppBar>
);

export default Header;
