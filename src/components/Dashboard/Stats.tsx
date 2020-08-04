import React, { Component, CSSProperties } from "react";
import {
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Box,
} from "@chakra-ui/core";
import "chart.js";

export class Stats extends Component<{
  style?: CSSProperties;
  m?: number | string;
  value: number | string;
  iconType?: "increase" | "decrease";
  description: string;
}> {
  componentDidMount() {}
  render() {
    return (
      <div>
        <Box
          p={5}
          shadow="md"
          borderWidth="0.2px"
          style={this.props.style}
          m={this.props.m}
          className="hoverable"
        >
          <StatGroup>
            <Stat>
              <StatNumber>
                <StatArrow type={this.props.iconType} /> {this.props.value}{" "}
              </StatNumber>
              <StatHelpText>{this.props.description}</StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
      </div>
    );
  }
}

export default Stats;
