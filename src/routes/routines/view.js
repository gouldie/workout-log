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

    return (
      <Container>
        {routine === null && <Loader />}
        {routine === false && <h1 style={{ textAlign: 'center' }}>Routine not found</h1>}
      </Container>
    )
  }
}

export default ViewRoutine
