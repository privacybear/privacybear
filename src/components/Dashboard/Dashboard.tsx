import React, { Component } from "react";
import { colors } from "../design/constants";
import { Flex, Grid, Text, Box, Image } from "@chakra-ui/core";
import { checkCredentials } from "../Auth/auth";
import error from './error.svg';
import {
  Layout,
  Stats,
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
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import "chart.js";

interface User {
  name: string;
  email: string;
  avatar?: string;
  timestamp: string;
}

export class Dashboard extends Component<
  {},
  { redirect: string | null; user: User | null; history: ISiteInfo[] | false | null }
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
      return this.setState({ redirect: "/login" });
    }
    getUserData().then((user) => {
      this.setState({ user: user });
      console.log(user);
    });
    getUserHistory().then((history) => {
      if (history.length < 5) {
        return this.setState({ history: false });
      }
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
    const userData = counterToChartData(countSites(this.state.history || []));
    const chartStyles = {
        label: "Your activity.",
        backgroundColor: "rgba(140, 158, 255, 1)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(61, 90, 254, 1)",
        hoverBorderColor: "rgba(255, 255, 255, 1)",
    }

    const activityChartData = {
      labels: userData.labels,
      datasets: [
        {
          ...chartStyles,          
          data: userData.data,
        },
      ],
    };

    return (
      <div>
        <Layout
          title={
            <div>
              Hi,{" "}
            <span style={{ color: colors.primaryColor }}>
              {this.state.user.name}
              </span>
            </div>
          }
        >
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
          <div>
            <Text
              mt={5}
              fontWeight="800"
              color={colors.primaryColor}
              fontSize={40}
            >
              Your Analytics
            </Text>
            {this.state.history ? (
              <Grid templateColumns="1fr 1fr" gap={6}>
              <Box p={5} boxShadow="md" borderWidth="0.2px">
                <Bar height={300} width={300} data={activityChartData}></Bar>
              </Box>
              <Box p={5} boxShadow="md" borderWidth="0.2px">
                <Doughnut height={300} width={300} data={activityChartData} />
              </Box>
               <Box p={5} boxShadow="md" borderWidth="0.2px">
                <Line height={300} width={300} data={activityChartData} />
              </Box>
              <Box p={5} boxShadow="md" borderWidth="0.2px">
                <Radar height={300} width={300} data={activityChartData} />
              </Box>
            </Grid>
            ) : (
                <div>
                  <Box mt={5} size="sm" borderWidth="0.2px" boxShadow="md" p={5}>
                    <Text mb={5} fontWeight="800" fontSize="28">Uh oh, you don't have enough data to show right now. Maybe go visit some websites?</Text>
                    <Image src={error} alt="Uh oh" />
                  </Box>
                </div>
            )}
          </div> 
        </Layout>
      </div>
    );
  }
}

export default Dashboard;
