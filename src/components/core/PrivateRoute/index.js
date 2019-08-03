import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => {
    if (!isAuthenticated) {
      // not logged in so redirect to login page with the return url
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }

    // authorised so return component
    return <Component {...props} />
  }} />
)

export default connect((state) => ({
  isAuthenticated: state.user.isAuthenticated
}), null, null, { pure: false })(PrivateRoute)
