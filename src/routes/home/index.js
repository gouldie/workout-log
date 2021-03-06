import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Home extends Component {
  render () {
    const { isAuthenticated } = this.props

    return (
      <div className='flex column link-list'>
        {!isAuthenticated && <p style={{ marginBottom: '30px' }}>Log in or register to access the full functionality of WKLog.</p>}
        <div style={{ marginBottom: '20px' }}><Link to='/exercises'>View exercises</Link></div>
        <div style={{ marginBottom: '20px' }}><Link to='/routines'>View routines</Link></div>
        {isAuthenticated && <div><Link to='/routine/create'>Create a routine</Link></div>}
      </div>
    )
  }
}

export default connect(state => ({
  isAuthenticated: state.user.isAuthenticated
}))(Home)
