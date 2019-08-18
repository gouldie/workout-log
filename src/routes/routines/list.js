import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
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
        this.setState({ routines: res.data.routines })
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  render () {
    const { isAuthenticated } = this.props
    const { routines } = this.state

    return (
      <Container id='routines-container' maxWidth='md'>
        {
          !isAuthenticated
            ? <p style={{ textAlign: 'center' }}>You need to be signed in to create a routine.</p>
            : <div>
              <div>
                {
                  routines && routines.map((r, i) => (
                    <Routine key={i} data={r} />
                  ))
                }
              </div>
            </div>
        }
      </Container>
    )
  }
}

export default connect(state => ({
  isAuthenticated: state.user.isAuthenticated
}))(Routines)
