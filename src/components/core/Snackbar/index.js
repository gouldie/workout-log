import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

export default ({ open, message, onClose }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    message={<span>{message}</span>}
    action={
      <IconButton
        key="close"
        aria-label="close"
        color="inherit"
        style={{ padding: '10px' }}
        onClick={onClose}
      >
        <Close />
      </IconButton>
    }
  />
)
