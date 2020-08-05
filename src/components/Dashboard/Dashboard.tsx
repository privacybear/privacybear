import React, { Component } from "react";
import { Logo } from "../design";
import { colors } from "../design/constants";
import { Flex, Text } from "@chakra-ui/core";
import { checkCredentials } from "../Auth/auth";
import {
  Stats,
  Menu,
  getUserData,
  getUserHistory,
  getWebsitesVisited,
  getDataSharedCount,
  ISiteInfo,
  removeDuplicates,
  countSites,
  counterToChartData,
} from "./dash";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { XYPlot, VerticalBarSeries } from "react-vis";

interface User {
  name: string;
  email: string;
  avatar?: string;
  timestamp: string;
}

export class Dashboard extends Component<
  {},
  { redirect: string | null; user: User | null; history: ISiteInfo[] | null }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      redirect: null,
      user: null,
      history: null,
    };
  }
  componentDidMount() {
    if (!checkCredentials()) {
      toast.error("😪 You need to be logged in...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.setState({ redirect: "/login" });
    }
    getUserData().then((user) => {
      this.setState({ user: user });
      console.log(user);
    });
    getUserHistory().then(async (history) => {
      this.setState({ history });
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    if (this.state.user == null) {
      return null;
    }
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
            Hi,{" "}
            <span style={{ color: colors.primaryColor }}>
              {this.state.user.name}
            </span>
          </Text>
          <Menu />
          <Flex flexDirection="row" style={{ padding: 5 }}>
            <Stats
              value={getDataSharedCount(this.state.history || [])}
              description="Times you've shared sensitive information."
              iconType="increase"
              m={3.5}
            />
            <Stats
              m={3.5}
              value={
                removeDuplicates(getWebsitesVisited(this.state.history || []))
                  .length
              }
              description="Sites you've shared sensitive information with."
              iconType="decrease"
            />
            <Stats
              m={3.5}
              value={getDataSharedCount(this.state.history || [])}
              description="Times you could've blocked sharing sensitive information."
            />
          </Flex>
          <XYPlot height={200} width={200}>
            <VerticalBarSeries
              barWidth={0.8}
              data={counterToChartData(countSites(this.state.history || []))}
            />
          </XYPlot>
        </Flex>
      </div>
    );
  }
}

export default Dashboard;
