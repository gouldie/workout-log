/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { TextField, Header, ContainedButton } from '../core'
import axios from 'axios'

export default class Login extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      error: null,
      submitting: false
    }
  }

  onChange = (e, type) => {
    this.setState({
      error: null,
      [type]: e.target.value
    })
  }

  submit = () => {
    const { email, password } = this.state

    this.setState({ submitting: true })

    axios.post('/api/login', { email, password })
      .then(res => {
        console.log('res', res)
        this.setState({ submitting: false })
        window.location.href = '/counter'
      })
      .catch(err => {
        if (err) {
          this.setState({ submitting: false, error: err.response.data })
        }
      })
  }

  render () {
    const { email, password, error } = this.state

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
        <div className='flex justify-end'>
          <ContainedButton
            label="Submit"
            onClick={this.submit}
          />
        </div>

        <p style={{ color: 'red' }}>{error}</p>
      </div>
    )
  }
}
