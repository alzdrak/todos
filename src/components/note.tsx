import React from "react";
import { Box, Text, Button, Menu, Grid } from "grommet";
// @ts-ignore
import { Close, More } from "grommet-icons";

interface NoteProps {
  id: string;
  text: string;
  size: string;
  remove(id: string): void;
}

class Note extends React.Component<NoteProps> {
  private remove = () => {
    //call function in main
    this.props.remove(this.props.id);
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
            <Text alignSelf="start">{this.props.text}</Text>
            {/* {size !== "small" ? <Text alignSelf="end">Cubes</Text> : null} */}
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
    );
  }
}

// const Note = (props: NoteProps) => {
//   <Box
//     pad="medium"
//     width="large"
//     height="xsmall"
//     align="center"
//     background={{ color: "light-2", opacity: "strong" }}
//     round
//     gap="small"
//     responsive={true}
//   >
//     <Grid
//       fill
//       areas={[
//         { name: "left", start: [0, 0], end: [0, 0] },
//         { name: "main", start: [1, 0], end: [1, 0] },
//         { name: "right", start: [2, 0], end: [2, 0] }
//       ]}
//       columns={["50px", "flex", "50px"]}
//       rows={["flex"]}
//       gap="small"
//     >
//       <Box gridArea="left" align="center" justify="center">
//         <Button icon={<Close />} hoverIndicator onClick={() => {}} />
//       </Box>
//       <Box
//         gridArea="main"
//         align="start"
//         justify="center"
//         style={{ overflow: "hidden" }}
//       >
//         <Text alignSelf="start">{props.text}</Text>
//         {/* {size !== "small" ? <Text alignSelf="end">Cubes</Text> : null} */}
//       </Box>
//       <Box gridArea="right" align="end" justify="center">
//         <Menu
//           icon={<More />}
//           dropAlign={{ right: "right", top: "bottom" }}
//           items={[
//             { label: "Edit", href: "#" },
//             { label: "Complete", href: "#" },
//             { label: "Delete", href: "#" }
//           ]}
//           size="xlarge"
//         />
//       </Box>
//     </Grid>
//   </Box>;
// };

export default Note;
