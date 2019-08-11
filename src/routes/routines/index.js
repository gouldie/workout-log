import React, { Component } from 'react'
import axios from 'axios'

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
    return (
      <div>

      </div>
    )
  }
}

export default Routines
