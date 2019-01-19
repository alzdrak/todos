import React from "react";
import { Box, Grommet, ResponsiveContext } from "grommet";
// @ts-ignore
import { FormClose, Notification, Close, Add, More } from "grommet-icons";

import Header from "./components/header";
import Main from "./components/main";
import NewNote from "./components/new-note";

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

// // Separate props from state and props from dispatch to their own interfaces.
// interface PropsFromState {
//   theme: ThemeColors
// }

// interface PropsFromDispatch {
//   [key: string]: any
// }

// // Any additional component props go here.
// interface OwnProps {
//   store: Store<ApplicationState>
//   history: History
// }

// // Create an intersection type of the component props and our Redux props.
// type AllProps = PropsFromState & PropsFromDispatch & OwnProps

class App extends React.Component {
  state = {
    showSidebar: false
  };

  open = () => this.setState({ showSidebar: true });

  close = () => this.setState({ showSidebar: false });

  toggle = () => {
    this.setState({ showSidebar: !this.state.showSidebar }, () => {
      //console.log("toggle state", this.state);
    });
  };

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
