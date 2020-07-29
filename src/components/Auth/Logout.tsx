import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { toast } from "react-toastify";
import { logout } from './auth';



export class Logout extends Component {
  componentDidMount() {
    logout();
    toast.success("✅ Logged out.")
  }
  render() {    
    return (
        <Redirect to="/login" />
    )
  }
}

export default Logout
