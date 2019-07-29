/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { TextField, Header, ContainedButton } from '../core'

export default class Login extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  onChange = (e, type) => {
    this.setState({
      [type]: e.target.value
    })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="login">
        <Header label="Login" />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => this.onChange(e, 'email')}
        />
        <TextField
          label="Password"
          fullWidth
          value={password}
          onChange={(e) => this.onChange(e, 'password')}
        />
        <div></div>
        <ContainedButton
          label="Submit"
          float='right'
        />
      </div>
    )
  }
}
