/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Loader } from '../components/core'

// Routes
const Accounts = lazy(() => import('./accounts'))

const Routes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route
          exact
          path="/login"
          render={props => {
            return <Accounts {...props} />
          }}
        />
        {/* <Route
          path="/auth"
          render={props => {
            // return APP_TOKEN.notEmpty ? <AuthLayout {...props} /> : <Redirect to="/login" />;
            return <AuthLayout {...props} />;
          }}
        /> */}
        {/* <Route component={NoMatchPage} /> */}
      </Switch>
    </Suspense>
  )
}

Routes.propTypes = {
  location: PropTypes.object // React Router Passed Props
}

export default Routes
