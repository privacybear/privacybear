import React, { Component } from 'react'
import Logo from './components/Logo';
import { Button } from "@chakra-ui/core";

export class App extends Component{
  render() {
    return (
      <div>
        Hi bro
        <Button>Hi</Button>
        <Logo/>
      </div>
    )
  }
}

export default App
