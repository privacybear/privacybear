import React, { Component } from 'react'
import logo from '../assets/logo.svg';
import './Logo.css';

export class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <img src={logo}/>
      </div>
    )
  }
}

export default Logo
