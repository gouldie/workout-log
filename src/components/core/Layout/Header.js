import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: '50px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function Header ({ title, isAuthenticated, logout, toggleModal, toggleDrawer }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {isAuthenticated && <Button color="inherit" onClick={logout}>
            Log out
          </Button>}
          {!isAuthenticated && <Button color="inherit" onClick={() => toggleModal('login')} style={{ marginRight: '10px' }}>
            Log in
          </Button>}
          {!isAuthenticated && <Button color="inherit" onClick={() => toggleModal('register')}>
            Register
          </Button>}
        </Toolbar>
      </AppBar>
    </div>
  )
}
