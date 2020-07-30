import React, { Component } from 'react'
import { checkCredentials } from '../Auth/auth';
import { getUserData } from './dash';
import { Redirect } from 'react-router-dom';
import { toast } from "react-toastify";

interface User {
  name: string,
  email: string,
  avatar?: string,
  timestamp: string,
}

export class Dashboard extends Component<{}, { redirect: string | null, user: User | null }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      redirect: null,
      user: null,
    }
  }
  componentDidMount() {
    if (!checkCredentials()) {
      toast.error('😪 You need to be logged in...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      this.setState({ redirect: '/login' });
    }
    getUserData()
      .then(user => {
        this.setState({ user: user });
        console.log(user);  
      })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    if (this.state.user == null) {
      return null;
    }
    return (
      <div>
        Dashboard, Hello {this.state.user.name}
      </div>
    )
  }
}

export default Dashboard
