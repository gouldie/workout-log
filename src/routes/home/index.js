import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Home extends Component {
  render () {
    const { isAuthenticated } = this.props

    return (
      <div className='flex column link-list'>
        {!isAuthenticated && <p style={{ marginBottom: '30px' }}>Log in or register to access the full functionality of WKLog.</p>}
        <Link to='/exercises'>View exercises</Link>
        <Link to='/routines'>View routines</Link>
        {isAuthenticated && <Link to='/routine/create'>Create a routine</Link>}
      </div>
    )
  }
}

export default connect(state => ({
  isAuthenticated: state.user.isAuthenticated
}))(Home)
