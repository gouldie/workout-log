/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { TextField, Title, ContainedButton } from '../core'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
        window.location.href = '/routines'
      })
      .catch(err => {
        if (err) {
          this.setState({ submitting: false, error: err.response.data })
        }
      })
  }

  goToLogin = () => {

  }

  render () {
    const { email, password, error, submitting } = this.state

    return (
      <form onSubmit={this.submit}>
        <Title label="Register" />
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
        <Link style={{ display: 'inline-block', marginTop: '40px' }} to='/login'>
          Already have an account? Click here to log in.
        </Link>
      </form>
    )
  }
}
