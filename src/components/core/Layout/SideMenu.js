import React, { Component } from 'react'
import Dumbbell from '../../../assets/images/dumbbell.png'
import LibraryBooks from '../../../assets/images/library-books.png'
import Home from '../../../assets/images/home.png'
import Settings from '../../../assets/images/account-settings.png'
import { Link } from 'react-router-dom'
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons'
import { Collapse, ListItemText, ListItemIcon, ListItem, Divider, List, Drawer } from '@material-ui/core'

export default class SideMenu extends Component {
  constructor () {
    super()

    this.state = {
      routinesExpand: true
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
                    <ListItem button style={{ paddingLeft: '30px' }} onClick={toggleDrawer(false)}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Create" />
                    </ListItem>
                  </Link>
                  <Link className='undecorated' to='/routines'>
                    <ListItem button style={{ paddingLeft: '30px' }} onClick={toggleDrawer(false)}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="List" />
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
            {false && <Divider />}
            {
              false &&
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
