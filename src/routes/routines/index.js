import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Routine from '../../components/routines/routine'

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
    const { routines } = this.state

    return (
      <div>
        {
          !isAuthenticated
            ? <p style={{ textAlign: 'center' }}>You need to be signed in to create a routine.</p>
            : <div>
              <p style={{ textAlign: 'center' }}>Create a routine.</p>
              <div>
                {
                  routines && routines.map((r, i) => (
                    <Routine key={i} data={r} />
                  ))
                }
              </div>
            </div>
        }
      </div>
    )
  }
}

export default connect(state => ({
  isAuthenticated: state.user.isAuthenticated
}))(Routines)
