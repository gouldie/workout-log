/* eslint-disable no-unused-vars */
import React from 'react'
import { Login, Register } from '../../components/accounts'

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

export default (props) => (
  <div id="container">
    <Screen {...props} />
  </div>
)
