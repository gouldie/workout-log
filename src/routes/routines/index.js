import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class Routines extends Component {
  constructor () {
    super()

    this.state = {
      routines: false
    }
  }

  componentDidMount () {
    axios.get('/api/routines')
      .then(res => {
        console.log('res', res)
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  render () {
    const { isAuthenticated } = this.props

    return (
      <div>
        {
          !isAuthenticated &&
          <p style={{ textAlign: 'center' }}>You need to be signed in to create a routine.</p>
        }
      </div>
    )
  }
}

export default connect(state => ({
  isAuthenticated: state.user.isAuthenticated
}))(Routines)
