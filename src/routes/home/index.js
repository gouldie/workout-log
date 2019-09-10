import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

class Home extends Component {
  render () {
    return (
      <div className='link-list'>
        <p style={{ marginBottom: '30px' }}>Log in or register to access the full functionality of WKLog.</p>
        <Link to='/exercises'>
          View the list of exercises
        </Link>
      </div>
    )
  }
}

export default Home
