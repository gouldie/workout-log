/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { TextField } from '../core'

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
        <h1>Login</h1>
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
      </div>
    )
  }
}
