import React, { Component } from 'react'
import { Header } from '../../core'
import { connect } from 'react-redux'
import { logout } from '../../../utils/auth'
import { Login, Register } from '../../accounts'

class Layout extends Component {
  constructor () {
    super()

    this.state = {
      modal: null
    }
  }

  toggleModal = (type) => {
    this.setState({ modal: this.state.modal === type ? null : type })
  }

  render () {
    const { modal } = this.state
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
        />
        <Login
          open={modal === 'login'}
          onClose={() => this.toggleModal()}
          onRegister={() => this.toggleModal('register')}
        />
        <Register
          open={modal === 'register'}
          onClose={() => this.toggleModal()}
          onLogin={() => this.toggleModal('login')}
        />
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
})

const mapDispatchToProps = (state) => ({

})

export default connect(mapStateToProps)(Layout)
