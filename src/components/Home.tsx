import React, { Component } from "react";
import { Title, Logo, Buttons } from "./design";
import { Flex, Text, Grid } from "@chakra-ui/core";
import { Link } from "react-router-dom";

import "./Home.css";

export class Home extends Component {
  render() {
    return (
      <div>
        <div style={{ margin: 10, padding: 10 }} className="_hover">
          <Logo style={{ height: 100, width: 100 }} isSVG={true} />
        </div>
        <div>
          <Flex
            align="center"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Title content="Privacy Bear" className="hero__title" />
            <Text className="hero__subtitle">Be in control.</Text>

            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={5}
              className="button__group"
            >
              <Link to="/register">
                <Buttons size="lg" type="primary">
                  Signup
                </Buttons>
              </Link>
              <Link to="/login">
                <Buttons size="lg">Login</Buttons>
              </Link>
            </Grid>
          </Flex>
        </div>
      </div>
    );
  }
}

export default Home;
