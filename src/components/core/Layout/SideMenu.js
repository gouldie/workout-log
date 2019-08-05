/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Dumbbell from '../../../assets/images/dumbbell.png'
import Exercises from '../../../assets/images/library-books.png'
import Home from '../../../assets/images/home.png'
import Settings from '../../../assets/images/account-settings.png'

export default class SideMenu extends Component {
  constructor () {
    super()

    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false
    }
  }

  render () {
    const { open, toggleDrawer, isAuthenticated } = this.props

    return (
      <div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <div
            style={{ width: '250px' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button key='home'>
                <ListItemIcon><img src={Home} style={{ width: '24px' }} /></ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
              <ListItem button key='routines'>
                <ListItemIcon><img src={Dumbbell} style={{ width: '24px' }} /></ListItemIcon>
                <ListItemText primary='Routines' />
              </ListItem>
              <ListItem button key='exercises'>
                <ListItemIcon><img src={Exercises} style={{ width: '24px' }} /></ListItemIcon>
                <ListItemText primary='Exercises' />
              </ListItem>
            </List>
            {isAuthenticated && <Divider />}
            {
              isAuthenticated &&
              <ListItem button key='settings'>
                <ListItemIcon><img src={Settings} style={{ width: '24px' }} /></ListItemIcon>
                <ListItemText primary='Settings' />
              </ListItem>
            }

          </div>
        </Drawer>
      </div>
    )
  }
}
