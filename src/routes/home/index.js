import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Home extends Component {
  render () {
    const { isAuthenticated } = this.props

    return (
      <div className='link-list'>
        {!isAuthenticated && <p style={{ marginBottom: '30px' }}>Log in or register to access the full functionality of WKLog.</p>}
        <Link to='/exercises'>
          View the list of exercises
        </Link>
      </div>
    )
  }
}

export default connect(state => ({
  isAuthenticated: state.user.isAuthenticated
}))(Home)
