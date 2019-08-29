import React, { Component } from 'react'
import Container from '@material-ui/core/Container'
import axios from 'axios'
import { Loader } from '../../components/core'

class ViewRoutine extends Component {
  constructor () {
    super()

    this.state = {
      routine: null // if invalid, this is set to false
    }
  }

  componentDidMount () {
    const routineId = this.props.match.params.id

    this.getRoutine(routineId)
  }

  getRoutine = (routineId) => {
    axios.get('/api/routine', {
      params: {
        routineId
      }
    })
      .then(res => {
        this.setState({ routine: res.data.routine })
      })
      .catch(err => {
        console.log('e', err)
        this.setState({ routine: false })
      })
  }

  render () {
    const { routine } = this.state

    console.log('r', routine)

    return (
      <Container className='flex column align-items-center'>
        {routine === null && <Loader />}
        {routine === false && <h1>Routine not found</h1>}
        {
          routine &&
          <div style={{ width: '100%', maxWidth: '500px', textAlign: 'left' }}>
            <h2>Name</h2>
            <p>{routine.name}</p>
            <h2>Description</h2>
            <p>{routine.description || 'No description'}</p>
          </div>
        }

      </Container>
    )
  }
}

export default ViewRoutine
