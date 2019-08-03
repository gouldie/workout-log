/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Loader, PrivateRoute } from '../components/core'

// Routes
const Accounts = lazy(() => import('./accounts'))
const Counter = lazy(() => import('./counter'))

const Routes = () => {
  return (
    <Suspense fallback={<Loader height />}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" render={props => <Accounts {...props} /> } />
        <Route exact path="/register" render={props => <Accounts {...props} /> } />
        <PrivateRoute exact path='/counter' Component={Counter} />

        {/* <Route component={NoMatchPage} /> */}
      </Switch>
    </Suspense>
  )
}

Routes.propTypes = {
  location: PropTypes.object // React Router Passed Props
}

export default Routes
