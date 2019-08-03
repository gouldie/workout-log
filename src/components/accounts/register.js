/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { TextField, Header, ContainedButton } from '../core'
import axios from 'axios'

export default class Register extends Component {
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

  submit = (e) => {
    e.preventDefault()
    const { email, password } = this.state

    this.setState({ submitting: true })

    axios.post('/api/register', { email, password })
      .then(res => {
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
    const { email, password, error, submitting } = this.state

    return (
      <form className="register" onSubmit={this.submit}>
        <Header label="Register" />
        <TextField
          label="Email"
          type='email'
          fullWidth
          value={email}
          onChange={(e) => this.onChange(e, 'email')}
        />
        <TextField
          label="Password"
          type='password'
          fullWidth
          value={password}
          onChange={(e) => this.onChange(e, 'password')}
        />
        <div className='flex justify-end'>
          <ContainedButton
            type='submit'
            label={submitting ? 'Submitting' : 'Submit'}
            onClick={this.submit}
          />
        </div>

        <p style={{ color: 'red' }}>{error}</p>
      </form>
    )
  }
}
