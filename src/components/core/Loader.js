/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  progress: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    margin: theme.spacing.unit * 5
  }
})

const Loader = ({ classes }) => {
  return (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  )
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired // Material UI Injected
}

export default withStyles(styles)(Loader)
