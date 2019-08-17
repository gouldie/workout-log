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
import Dumbbell from '../../../assets/images/dumbbell.png'
import LibraryBooks from '../../../assets/images/library-books.png'
import Home from '../../../assets/images/home.png'
import Settings from '../../../assets/images/account-settings.png'
import { Link } from 'react-router-dom'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import StarBorder from '@material-ui/icons/StarBorder'

export default class SideMenu extends Component {
  constructor () {
    super()

    this.state = {
      routinesExpand: false
    }
  }

  handleClick = (e) => {
    e.preventDefault()
    this.setState({
      routinesExpand: !this.state.routinesExpand
    })
  }

  render () {
    const { open, toggleDrawer, isAuthenticated } = this.props
    const { routinesExpand } = this.state

    return (
      <div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <div
            style={{ width: '250px' }}
            role="presentation"
            // onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List style={{ zIndex: 2000 }}>
              <Link className='undecorated' to='/'>
                <ListItem button key='home' onClick={toggleDrawer(false)}>
                  <ListItemIcon><img src={Home} style={{ width: '24px' }} /></ListItemIcon>
                  <ListItemText primary='Home' />
                </ListItem>
              </Link>
              <ListItem button key='routines' onClick={this.handleClick}>
                <ListItemIcon><img src={LibraryBooks} style={{ width: '24px' }} /></ListItemIcon>
                <ListItemText primary='Routines' />
                {routinesExpand ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={routinesExpand} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link className='undecorated' to='/routine/create'>
                    <ListItem button style={{ paddingLeft: '30px' }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Create" onClick={toggleDrawer(false)} />
                    </ListItem>
                  </Link>
                  <Link className='undecorated' to='/routines'>
                    <ListItem button style={{ paddingLeft: '30px' }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="List" onClick={toggleDrawer(false)} />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>
              <Link className='undecorated' to='/exercises'>
                <ListItem button key='exercises' onClick={toggleDrawer(false)}>
                  <ListItemIcon><img src={Dumbbell} style={{ width: '24px' }} /></ListItemIcon>
                  <ListItemText primary='Exercises' />
                </ListItem>
              </Link>
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
