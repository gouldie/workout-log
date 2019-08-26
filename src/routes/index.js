import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { Loader, Layout } from '../components/core'

// Routes
const Home = lazy(() => import('./home'))
const RoutineList = lazy(() => import('./routines/list'))
const RoutineCreate = lazy(() => import('./routines/create'))
const RoutineView = lazy(() => import('./routines/view'))
const Exercises = lazy(() => import('./exercises'))

const Routes = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path='/routines' component={RoutineList} />
          <Route exact path='/routine/create' component={RoutineCreate} />
          <Route exact path='/routine/:id' component={RoutineView} />
          <Route exact path='/exercises' component={Exercises} />

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
