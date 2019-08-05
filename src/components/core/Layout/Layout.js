import React, { Component } from 'react'
import { Header, SideMenu } from '../../core'
import { connect } from 'react-redux'
import { logout } from '../../../utils/auth'
import { AccountsModal } from '../../accounts'

class Layout extends Component {
  constructor () {
    super()

    this.state = {
      modal: null,
      sideMenu: false
    }
  }

  toggleModal = (type) => {
    this.setState({ modal: this.state.modal === type ? null : type })
  }

  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    this.setState({ ...this.state, sideMenu: open })
  }

  render () {
    const { modal, sideMenu } = this.state
    const {
      children,
      title,
      isAuthenticated
    } = this.props

    return (
      <div>
        <Header
          title={title}
          isAuthenticated={isAuthenticated}
          logout={logout}
          toggleModal={this.toggleModal}
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
          onClose={() => this.toggleModal()}
        />
        <AccountsModal
          type='register'
          open={modal === 'register'}
          onClose={() => this.toggleModal()}
        />
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps)(Layout)
