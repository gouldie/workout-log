import React, { Component } from 'react'
import { ContainedButton } from '../../components/core'
import axios from 'axios'

class Counter extends Component {
  logout = () => {
    axios.post('/api/logout')
      .then(res => {
        window.location.href = '/login'
      })
  }

  render () {
    return (
      <div className='flex justify-center' style={{ marginTop: '100px' }}>
        <ContainedButton
          label='Log out'
          onClick={this.logout}
        />
      </div>
    )
  }
}

export default Counter
