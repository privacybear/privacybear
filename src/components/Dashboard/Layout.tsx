import React, { Component } from 'react';
import { Logo } from "../design";
import { Flex, Text } from "@chakra-ui/core";
import {
  Menu,
} from "./dash";


export class Layout extends Component<
  {title?: React.ReactNode},
  {}
> {
  render() {
    
    return (
      <div>
        <Flex
          align="center"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={5}
          padding={15}
        >
          <Logo style={{ width: 100, height: 100, padding: 10 }} isSVG={true} />
          <Text
            mt={5}
            style={{ textTransform: "uppercase" }}
            fontWeight="800"
            fontSize={["4xl", "5xl", "5xl", "6xl"]}
          >
            {this.props.title}
            
          </Text>
          <Menu />
        {this.props.children}
        </Flex>
          
      </div>
    )
  }
}

export default Layout;
