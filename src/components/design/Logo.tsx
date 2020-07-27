import React, { Component } from 'react'
import logoSVG from './logo.svg';
import logo from './logo.png';
import './Logo.css';

interface Props { style?: object, isSVG?: boolean }

export class Logo extends Component<Props> {
  render() {
    return (
      <div className="logo">
        <img src={this.props.isSVG ? logoSVG : logo} style={this.props.style} alt="Logo"/>
      </div>
    )
  }
}

export default Logo
