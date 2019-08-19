import React, { Component } from 'react'
import { Header, SideMenu } from '../../core'
import { connect } from 'react-redux'
import { logout } from '../../../utils/auth'
import { AccountsModal } from '../../accounts'
import { withRouter } from 'react-router'
import { displayModal } from '../../../actions/accounts'

const titles = {
  '/': 'Home',
  '/routines': 'Routines',
  '/routine/create': 'Routines',
  '/exercises': 'Exercises'
}

class Layout extends Component {
  constructor () {
    super()

    this.state = {
      sideMenu: false
    }
  }

  // toggleModal = (type) => {
  //   this.setState({ modal: this.state.modal === type ? null : type })
  // }

  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    console.log('open', open)

    this.setState({ ...this.state, sideMenu: open })
  }

  render () {
    const { sideMenu } = this.state
    const {
      children,
      isAuthenticated,
      location,
      modal,
      displayModal
    } = this.props

    return (
      <div>
        <Header
          title={titles[location.pathname]}
          isAuthenticated={isAuthenticated}
          logout={logout}
          toggleModal={displayModal}
          toggleDrawer={this.toggleDrawer}
        />
        <SideMenu
          toggleDrawer={this.toggleDrawer}
          open={sideMenu}
          isAuthenticated={isAuthenticated}
        />
        <AccountsModal
          type='login'
          open={modal === 'login'}
          onClose={displayModal}
        />
        <AccountsModal
          type='register'
          open={modal === 'register'}
          onClose={displayModal}
        />
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  modal: state.accounts.modal
})

const mapDispatchToProps = (dispatch) => ({
  displayModal: (modal) => dispatch(displayModal(modal))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
