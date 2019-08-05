/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Loader, PrivateRoute, Layout } from '../components/core'

// Routes
const Home = lazy(() => import('./home'))
const Routines = lazy(() => import('./routines'))
const Exercises = lazy(() => import('./exercises'))

const Routes = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path='/routines' render={() => <Routines />} />
          <Route exact path='/exercises' render={() => <Exercises />} />

          {/* <Route component={NoMatchPage} /> */}
        </Switch>
      </Suspense>
    </Layout>
  )
}

Routes.propTypes = {
  location: PropTypes.object // React Router Passed Props
}

export default Routes
