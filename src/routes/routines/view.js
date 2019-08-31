import React, { Component } from 'react'
import Container from '@material-ui/core/Container'
import axios from 'axios'
import { Loader } from '../../components/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import exercises from '../../assets/json/exercises.json'

const days = {
  MON: 'Monday',
  TUE: 'Tuesday',
  WED: 'Wednesday',
  THU: 'Thursday',
  FRI: 'Friday',
  SAT: 'Saturday',
  SUN: 'Sunday'
}

class ViewRoutine extends Component {
  constructor () {
    super()

    this.state = {
      routine: null, // if invalid, this is set to false
      editing: {
        type: null,
        value: null
      }
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

  editName = () => {
    this.setState({
      editing: {
        type: 'name',
        value: this.state.routine.name
      }
    })
  }

  onChangeName = (e) => {
    this.setState({
      editing: {
        type: 'name',
        value: e.target.value
      }
    })
  }

  saveName = () => {
    axios.post('/api/routine/name', { routineId: this.props.match.params.id, name: this.state.editing.value })
      .then(res => {
        this.setState({
          editing: {
            type: null,
            value: null
          },
          routine: res.data.routine
        })
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  editDescription = () => {
    this.setState({
      editing: {
        type: 'description',
        value: this.state.routine.description
      }
    })
  }

  onChangeDescription = (e) => {
    this.setState({
      editing: {
        type: 'description',
        value: e.target.value
      }
    })
  }

  saveDescription = () => {
    axios.post('/api/routine/description', { routineId: this.props.match.params.id, description: this.state.editing.value })
      .then(res => {
        this.setState({
          editing: {
            type: null,
            value: null
          },
          routine: res.data.routine
        })
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  editDay = (day) => {
    this.setState({
      editing: {
        type: day,
        value: this.state.routine.days[day]
      }
    })
  }

  exerciseOnChange = (e, i) => {
    const currentValue = this.state.editing.value

    currentValue[i].exercise = e.target.value

    this.setState({
      editing: {
        ...this.state.editing,
        value: currentValue
      }
    })
  }

  saveDay = () => {
    const day = this.state.editing.type
    const value = this.state.editing.value

    console.log('day', day)
    console.log('new value', value)
    axios.post('/api/routine/day', { routineId: this.props.match.params.id, day, value })
      .then(res => {
        console.log('res', res)
        this.setState({ routine: res.data.routine })
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  cancel = () => {
    this.setState({
      editing: {
        type: null,
        value: null
      }
    })
  }

  render () {
    const { routine, editing: { type, value } } = this.state

    return (
      <Container className='flex column align-items-center'>
        {routine === null && <Loader />}
        {routine === false && <h1>Routine not found</h1>}
        {
          routine &&
          <div style={{ width: '100%', maxWidth: '800px', textAlign: 'left' }}>
            <div className='flex align-items-center' style={{ marginBottom: '20px' }}>
              {
                type === 'name'
                  ? <div className='flex align-items-center' style={{ height: '32px' }}>
                    <TextField
                      value={value}
                      onChange={this.onChangeName}
                      InputProps={{
                        style: { fontSize: '20px' }
                      }}
                      placeholder='Name'
                    />
                    <SaveIcon
                      style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '18px' }}
                      onClick={this.saveName}
                    />
                    <CloseIcon
                      style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '22px' }}
                      onClick={this.cancel}
                    />
                  </div>

                  : <div className='flex align-items-center' style={{ height: '32px' }}>
                    <h2 style={{ margin: 0 }}>{routine.name}</h2>
                    <EditIcon
                      style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '18px' }}
                      onClick={this.editName}
                    />
                  </div>
              }

            </div>

            <div className='flex align-items-center' style={{ marginBottom: '20px' }}>
              {
                type === 'description'
                  ? <div className='flex align-items-center' style={{ height: '32px', width: '100%' }}>
                    <TextField
                      value={value}
                      onChange={this.onChangeDescription}
                      InputProps={{
                        style: { fontSize: '16px' }
                      }}
                      placeholder='Description'
                      multiline
                      fullWidth
                      rowsMax={3}
                    />
                    <SaveIcon
                      style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '18px' }}
                      onClick={this.saveDescription}
                    />
                    <CloseIcon
                      style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '22px' }}
                      onClick={this.cancel}
                    />
                  </div>

                  : <div className='flex align-items-center' style={{ height: '32px' }}>
                    <p style={{ margin: 0 }}>{routine.description || 'No description'}</p>
                    <EditIcon
                      style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '18px' }}
                      onClick={this.editDescription}
                    />
                  </div>
              }

            </div>
            <div style={{ margin: '40px 0' }}>
              {
                Object.keys(routine.days).map((day, i) => {
                  return (
                    <div key={i}>
                      <div className='flex'>
                        <h2>{days[day]}</h2>
                        {
                          type === day ? <div>
                            <SaveIcon
                              style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '18px' }}
                              onClick={this.saveDay}
                            />
                            <CloseIcon
                              style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '22px' }}
                              onClick={this.cancel}
                            />
                          </div>
                            : <EditIcon
                              style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '18px' }}
                              onClick={() => this.editDay(day)}
                            />
                        }
                      </div>
                      <Paper>
                        <Table style={{ marginBottom: '16px' }}>
                          <TableHead>
                            <TableRow>
                              <TableCell width='70%'>Exercise</TableCell>
                              <TableCell width='15%'>Sets</TableCell>
                              <TableCell width='15%'>Reps</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              routine.days[day].map((e, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>
                                      {type === day
                                        ? <Select value={value[i].exercise} onChange={(e) => this.exerciseOnChange(e, i)}>
                                          {
                                            exercises.map((e, i) => <MenuItem key={i} value={e.name}>{e.name}</MenuItem>)
                                          }
                                        </Select> : e.exercise}
                                    </TableCell>
                                    <TableCell>{e.sets}</TableCell>
                                    <TableCell>{e.reps}</TableCell>
                                  </TableRow>
                                )
                              })
                            }
                          </TableBody>
                        </Table>
                      </Paper>
                    </div>
                  )
                })
              }
            </div>
          </div>
        }

      </Container>
    )
  }
}

export default ViewRoutine
