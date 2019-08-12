/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Routes from './routes'
import createStore from './store'
import { isAuthenticated } from './actions/user'

import './sass/index.scss'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})
const store = createStore()

axios.get('/api/user')
  .then(res => {
    if (res.data.user) {
      store.dispatch(isAuthenticated(true))
    }

    ReactDOM.render(
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Routes />
          </Router>
        </Provider>
      </MuiThemeProvider>, document.getElementById('app')
    )
  })
