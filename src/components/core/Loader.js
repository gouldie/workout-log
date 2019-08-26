import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Loader2 from '../../assets/images/loader.svg'
import SVG from 'react-inlinesvg'

const styles = theme => ({
  progress: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh'
  }
})

const Loader = ({ classes }) => {
  return (
    <div className={classes.progress}>
      <SVG src={Loader2} style={{ width: '100px', height: '100px' }} />
    </div>
  )
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired // Material UI Injected
}

export default withStyles(styles)(Loader)
