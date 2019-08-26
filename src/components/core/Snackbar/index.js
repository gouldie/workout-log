import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

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
        <CloseIcon />
      </IconButton>
    }
  />
)
