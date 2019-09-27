import React, { Component } from 'react'
import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, TextField, Button } from '@material-ui/core'
import axios from 'axios'

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
        window.location.reload()
      })
      .catch(err => {
        if (err) {
          this.setState({ submitting: false, error: err.response.data })
        }
      })
  }

  render () {
    const { email, password, error } = this.state
    const { open, onClose, type } = this.props

    return (
      <Dialog id='accounts-dialog' open={open} onClose={() => onClose()} aria-labelledby="accounts-dialog-title" style={{ maxHeight: '100%' }}>
        <form className='accounts-modal'>
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
            <Button onClick={() => onClose()} color="primary">
            Cancel
            </Button>
            <Button type='submit' onClick={this.submit} color="primary">
              {labels[type].submitButton}
            </Button>
          </DialogActions>
          {
            error &&
          <DialogContentText style={{ padding: 0, margin: '10px 0 0', color: 'red' }}>
            {error}
          </DialogContentText>
          }
        </form>
      </Dialog>
    )
  }
}
