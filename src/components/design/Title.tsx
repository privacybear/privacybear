import React, { Component } from 'react';
import { Text } from "@chakra-ui/core";

interface Props {
  content: string,
  color?: string,
  style?: object,
  className?: string
}
interface State { }

export class Title extends Component<Props, State> {
  render() {
    return (
      <div>
        <Text fontWeight="800" color={this.props.color} style={this.props.style} className={this.props.className}>{this.props.content}</Text>
      </div>
    )
  }
}

export default Title
