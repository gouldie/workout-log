import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import exercises from '../../assets/json/exercises.json'
import Exercise from '../../components/exercises/exercise'
// import { Container } from '../../components/core'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import CloseIcon from '@material-ui/icons/Close'

class Exercises extends Component {
  constructor () {
    super()

    this.state = {
      filter: ''
    }
  }

  filterOnChange = (e) => {
    this.setState({ filter: e.target.value })
  }

  clearFilter = () => {
    this.setState({ filter: '' })
  }

  render () {
    const { filter } = this.state

    const filteredExercises = exercises && exercises.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))

    return (
      <Container maxWidth='sm'>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <CloseIcon style={{ color: 'gray', cursor: 'pointer' }} onClick={this.clearFilter} />
              </InputAdornment>
            )
          }}
          value={filter}
          onChange={this.filterOnChange}
          placeholder='Filter'
          style={{
            maxWidth: '500px',
            width: '100%',
            borderRadius: '5px',
            backgroundColor: '#fff',
            padding: '5px 10px',
            marginBottom: '20px'
          }}
        />
        <div className='exercise-container flex column' style={{ width: '100%' }}>
          {
            filteredExercises && filteredExercises.map((e, i) => (
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
