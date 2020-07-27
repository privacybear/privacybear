import React, { Component } from 'react';
import { Button, IButton } from '@chakra-ui/core';
import { colors } from './constants';

interface Props {
  size?: IButton["size"];
  type?: "primary" | "normal" | undefined;
}

export class Buttons extends Component<Props> {
  render() {
    if (this.props.type === "primary") {
      return (
        <Button
          size={this.props.size || "md"}
          bg={colors.primaryColor}
          color="#fff"
          fontWeight="bolder"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          _hover={{ bg: colors.primaryColor, transform: "translate(0, -5px)" }}
         
        >
          {this.props.children}
        </Button>
      )
    }
    else {
      return (
        <Button
          size={this.props.size || "md"}
          bg="#fff"
          color={colors.primaryColor}
          border={`1px solid ${colors.primaryColor}`}
          fontWeight="bolder"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          _hover={{ bg: "#fff", transform: "translate(0, -5px)" }}
        >
            {this.props.children}
        </Button>
      )
    }
  }
}

export default Buttons
