/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import App from './App'
import './sass/index.scss'

axios.get('/api/user')
  .then(res => {
    console.log('res', res)

    ReactDOM.render(<App />, document.getElementById('app'))
  })
