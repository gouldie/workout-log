import React, { Component } from 'react'
import { SubmitButton } from '../../components/core'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import axios from 'axios'

class CreateRoutine extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      desc: '',
      days: [],
      error: null
    }
  }

  handleChange = (type, e) => {
    this.setState({ [type]: e.target.value, error: null })
  }

  toggleDay = (day) => {
    const newDays = this.state.days
    const index = newDays.indexOf(day)

    if (index >= 0) {
      newDays.splice(index, 1)
    } else {
      newDays.push(day)
    }

    this.setState({ days: newDays, error: null })
  }

  submit = (e) => {
    e.preventDefault()

    const { name, days, desc } = this.state

    if ((!name && name !== 0)) {
      this.setState({ error: 'Name is required' })
      return
    }
    if ((!desc && desc !== 0)) {
      this.setState({ error: 'Desc is required' })
      return
    }
    if (days.length <= 0) {
      this.setState({ error: 'Please select at least one day' })
      return
    }

    this.setState({ submitting: true, error: null })

    axios.post('/api/routine', { name, desc, days })
      .then(res => {
        window.location.href = '/routines'
      })
      .catch(res => {
        this.setState({ submitting: false, error: 'An internal error occurred' })
      })
  }

  render () {
    const { name, desc, days, error, submitting } = this.state

    return (
      <Container id='create-routine-container' maxWidth='md' className='flex column align-items-center'>
        <h1>Create a new routine</h1>
        <form onSubmit={this.submit} className='flex column align-items-center' style={{ marginTop: '30px' }}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel htmlFor="routine-name">Routine name</InputLabel>
            <Input fullWidth id="routine-name" value={name} onChange={(e) => this.handleChange('name', e)} />
          </FormControl>
          <FormControl style={{ width: '100%', marginTop: '15px' }}>
            <InputLabel htmlFor="routine-desc">Routine description</InputLabel>
            <Input multiline fullWidth id="routine-desc" value={desc} onChange={(e) => this.handleChange('desc', e)} />
          </FormControl>
          <Grid item style={{ marginTop: '30px' }}>
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d, i) => (
              <Button key={i} variant='contained' color={days.includes(d) ? 'primary' : 'default'}
                onClick={() => this.toggleDay(d)} style={{ margin: '0 5px' }}>
                {d}
              </Button>
            ))
            }
          </Grid>
          {error && <p style={{ textAlign: 'center', color: 'red', marginTop: '30px' }}>{error}</p>}
          <div className='flex justify-end' style={{ marginTop: '30px', width: '100%' }}>
            <SubmitButton submitting={submitting} />
          </div>
        </form>
      </Container>
    )
  }
}

export default CreateRoutine
