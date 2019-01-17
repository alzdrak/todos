import React, { Component } from "react";
import { Box, Grid, Text, Button, Menu } from "grommet";
// @ts-ignore
import { Close, More } from "grommet-icons";

const Main = (props: { size: string }) => {
  const { size } = props;
  return (
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
              <Button icon={<Close />} hoverIndicator onClick={() => {}} />
            </Box>
            <Box
              gridArea="main"
              align="start"
              justify="center"
              style={{ overflow: "hidden" }}
            >
              <Text alignSelf="start">Take car for a service</Text>
              {size !== "small" ? <Text alignSelf="end">Cubes</Text> : null}
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
  );
};

export default Main;
