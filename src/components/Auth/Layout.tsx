import React, { Component } from 'react'


export class Layout extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Layout
