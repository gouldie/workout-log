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
    const { open, onClose } = this.props

    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Log in</DialogTitle>
        <DialogContent>
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
        <DialogActions style={{ paddingRight: '24px' }} >
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.submit} color="primary">
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
