/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Container from '@material-ui/core/Container'

class ViewRoutine extends Component {
  constructor () {
    super()

    this.state = {

    }
  }

  componentDidMount () {
    const { routineId } = this.props.match.params.id
  }

  render () {
    return (
      <Container>
        view
      </Container>
    )
  }
}

export default ViewRoutine
