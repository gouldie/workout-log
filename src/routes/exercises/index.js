import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import exercises from '../../assets/json/exercises.json'
import Exercise from '../../components/exercises/exercise'
// import { Container } from '../../components/core'
import Container from '@material-ui/core/Container'

class Exercises extends Component {
  constructor () {
    super()

    this.state = {
      hover: null
    }
  }

  render () {
    return (
      <Container maxWidth='sm'>
        <div className='exercise-container flex column' style={{ width: '100%' }}>
          {
            exercises && exercises.map((e, i) => (
              <Exercise
                key={i}
                data={{ ...e }}
              />
            ))
          }
        </div>

      </Container>
    )
  }
}

export default Exercises
