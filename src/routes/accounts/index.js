/* eslint-disable no-unused-vars */
import React from 'react'
import { Login, Register } from '../../components/accounts'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Screen = (props) => {
  switch (props.match.path) {
    case '/login':
      return <Login {...props} />
    case '/register':
      return <Register {...props} />
    default:
      // Redirect!
      return <div></div>
  }
}

const Accounts = (props) => {
  if (props.isAuthenticated) {
    return <Redirect to={{ pathname: '/counter', state: { from: props.location } }} />
  }

  return (
    <div id="accounts" className="flex justify-center">
      <Screen {...props} />
    </div>
  )
}

export default connect((state) => ({
  isAuthenticated: state.user.isAuthenticated
}), null, null, { pure: false })(Accounts)
