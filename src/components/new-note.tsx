import React from "react";
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
import { FormClose, Notification, Close, Add, More } from "grommet-icons";

interface IProps {
  show: boolean;
  size: string;
  toggle: React.FormEventHandler;
}

class NewNote extends React.Component<IProps> {
  render() {
    const { size, show, toggle } = this.props;

    return (
      <>
        {!show || size !== "small" ? (
          <Collapsible direction="horizontal" open={show}>
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
                onSubmit={toggle}
                background="light-2"
                tag="header"
                pad="large"
              >
                <Box flex={false} direction="row" justify="between">
                  <Heading level="2" margin="none">
                    Add a New Note
                  </Heading>
                  <Button icon={<Close />} onClick={toggle} />
                </Box>

                <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
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
                    onClick={toggle}
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
            onClickOutside={toggle}
            onEsc={toggle}
          >
            <Box
              as="form"
              fill="vertical"
              overflow="auto"
              onSubmit={toggle}
              background="light-2"
              tag="header"
              pad="large"
            >
              <Box flex={false} direction="row" justify="between">
                <Heading level="2" margin="none">
                  Add a New Note
                </Heading>
                <Button icon={<Close />} onClick={toggle} />
              </Box>

              <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
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
                  onClick={toggle}
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

export default NewNote;
