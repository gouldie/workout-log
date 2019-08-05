/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Title, ContainedButton } from '../core'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const labels = {
  login: {
    title: 'Log in',
    submitButton: 'Log in',
    submitRoute: '/api/login'
  },
  register: {
    title: 'Register',
    submitButton: 'Register',
    submitRoute: '/api/register'
  }
}

export default class AccountsModal extends Component {
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
    const { type } = this.props

    if (!email || !password) {
      this.setState({ error: 'Email and password is required' })
      return
    }

    this.setState({ submitting: true })

    axios.post(labels[type].submitRoute, { email, password })
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

  render () {
    const { email, password, error, submitting } = this.state
    const { open, onClose, type } = this.props

    return (
      <Dialog id='accounts-dialog' open={open} onClose={onClose} aria-labelledby="accounts-dialog-title" style={{ maxHeight: '100%' }}>
        <div className='accounts-modal'>
          <DialogTitle id="accounts-dialog-title" style={{ padding: 0, margin: '0 0 10px' }}>{labels[type].title}</DialogTitle>
          <DialogContent style={{ padding: 0, margin: '10px 0', minHeight: '100px' }}>
            <TextField
              label="Email"
              type='email'
              fullWidth
              value={email}
              margin="dense"
              fullWidth
              onChange={(e) => this.onChange(e, 'email')}
            />
            <TextField
              label="Password"
              type='password'
              fullWidth
              value={password}
              margin="dense"
              fullWidth
              onChange={(e) => this.onChange(e, 'password')}
            />
          </DialogContent>
          <DialogActions style={{ padding: 0, margin: '10px 0 0' }} >
            <Button onClick={onClose} color="primary">
            Cancel
            </Button>
            <Button onClick={this.submit} color="primary">
              {labels[type].submitButton}
            </Button>
          </DialogActions>
          {
            error &&
          <DialogContentText style={{ padding: 0, margin: '10px 0 0', color: 'red' }}>
            {error}
          </DialogContentText>
          }
        </div>
      </Dialog>
    )
  }
}
