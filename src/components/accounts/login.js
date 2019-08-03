/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { TextField, Header, ContainedButton } from '../core'
import axios from 'axios'
import { Link } from 'react-router-dom'

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

  submit = (e) => {
    e.preventDefault()
    const { email, password } = this.state

    this.setState({ submitting: true })

    axios.post('/api/login', { email, password })
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
      <form onSubmit={this.submit}>
        <Header label="Login" />
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
        <Link style={{ display: 'inline-block', marginTop: '40px' }} to='/register'>
          Don't have an account? Click here to register.
        </Link>
      </form>
    )
  }
}
