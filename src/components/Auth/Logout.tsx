import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { toast } from "react-toastify";
import { logout } from './auth';

logout();

export class Logout extends Component {
  render() {
    return (
      <div>
        {toast.success("✅ Logged out")}
        <Redirect to="/login" />
      </div>
    )
  }
}

export default Logout
