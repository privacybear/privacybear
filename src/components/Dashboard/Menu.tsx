import React, { Component } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Box
} from "@chakra-ui/core";
import { colors } from "../design/constants";
import { Link } from "react-router-dom";

export class Menu extends Component {
  render() {
    return (
      <div>
        <Box>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/dashboard" style={{color: colors.primaryColor}}>Home</Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Link to="/dashboard/rules" style={{color: colors.primaryColor}}>Rules</Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <Link to="/dashboard/history" style={{color: colors.primaryColor}}>History</Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <Link to="/logout" style={{color: colors.dangerColor}}>Logout</Link>
            </BreadcrumbItem>
            </Breadcrumb>
        </Box>     
      </div>
    )
  }
}

export default Menu
