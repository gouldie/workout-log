import React, { Component } from 'react'
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField, MenuItem, Select, Button, Popover, List, ListItem, ListItemText, Checkbox } from '@material-ui/core'
import axios from 'axios'
import { Loader } from '../../components/core'
import { Edit, Save, Close, KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'
import exercises from '../../assets/json/exercises.json'
import { Link } from 'react-router-dom'
import { arrayMove } from '../../utils/functions'
import { connect } from 'react-redux'

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
      },
      popover: false,
      error: null,
      deleting: false
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
        if (!res.data.success) {
          this.setState({
            error: res.data.message
          })
        } else {
          this.setState({ routine: res.data.routine })
        }
      })
      .catch(err => {
        console.log('e', err)
        this.setState({
          routine: false,
          error: 'Routine not found'
        })
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
        this.setState({
          editing: {
            type: null,
            value: null
          }
        })
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
        this.setState({
          editing: {
            type: null,
            value: null
          }
        })
      })
  }

  editDay = (day) => {
    this.setState({
      editing: {
        type: day,
        value: this.state.routine.days[day].map(e => e)
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

  setsOnChange = (e, i) => {
    if (e.target.value > 1000) return
    const currentValue = this.state.editing.value

    currentValue[i].sets = e.target.value

    this.setState({
      editing: {
        ...this.state.editing,
        value: currentValue
      }
    })
  }

  repsOnChange = (e, i) => {
    if (e.target.value > 1000) return
    const currentValue = this.state.editing.value

    currentValue[i].reps = e.target.value

    this.setState({
      editing: {
        ...this.state.editing,
        value: currentValue
      }
    })
  }

  deleteExercise = (i) => {
    const newValue = this.state.editing.value.filter((v, i2) => i !== i2)

    this.setState({
      editing: {
        ...this.state.editing,
        value: newValue
      }
    })
  }

  addExercise = () => {
    const currentValue = this.state.editing.value

    currentValue.push({ exercise: 'Barbell Curl', sets: 3, reps: 10 })

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

    axios.post('/api/routine/day', { routineId: this.props.match.params.id, day, value })
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
        this.setState({
          editing: {
            type: null,
            value: null
          }
        })
      })
  }

  togglePopover = () => {
    this.setState({ popover: !this.state.popover })
  }

  closePopover = () => {
    this.setState({ popover: false })
  }

  addDay = (day) => {
    axios.post('/api/routine/day', { routineId: this.props.match.params.id, day, value: [], adding: true })
      .then(res => {
        this.setState({
          routine: res.data.routine,
          popover: false
        })
      })
      .catch(err => {
        if (err) console.log('err', err)
        this.setState({
          popover: false
        })
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

  setPrivate = (e) => {
    axios.post('/api/routine/private', { routineId: this.props.match.params.id, isPrivate: e.target.checked })
      .then(res => {
        this.setState({
          routine: res.data.routine
        })
      })
      .catch(err => {
        if (err) console.log('err', err)
      })
  }

  reorderExercise = (day, pos, direction) => {
    const newDay = this.state.editing.value

    arrayMove(newDay, pos, direction === 'up' ? pos - 1 : pos + 1)

    this.setState({
      editing: {
        ...this.state.editing,
        value: newDay
      }
    })
  }

  deleteRoutine = () => {
    this.setState({ deleting: true })

    axios.delete('/api/routine', {
      data: {
        id: this.state.routine._id
      }
    })
      .then(res => {
        window.location.href = '/routines'
      })
  }

  render () {
    const { routine, editing: { type, value }, popover, error, deleting } = this.state
    const { userId } = this.props

    const isOwnRoutine = routine && (userId === routine.userId)

    return (
      <Container className='flex column align-items-center' onClick={this.closePopover}>
        {routine === null && !error && <Loader />}
        {error && <div style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: '16px' }}>{error}</h1>
          <p>Go back to the <Link to='/routines'>routine list</Link>.</p>
        </div>}
        {
          routine &&
          <div style={{ width: '100%', maxWidth: '800px', textAlign: 'left', marginBottom: '50px' }}>
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
                    <Save
                      style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '14px' }}
                      onClick={this.saveName}
                    />
                    <Close
                      style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '14px' }}
                      onClick={this.cancel}
                    />
                  </div>

                  : <div className='flex align-items-center' style={{ height: '32px' }}>
                    <h2 style={{ margin: 0 }}>{routine.name}</h2>
                    {isOwnRoutine && <Edit
                      style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '14px' }}
                      onClick={this.editName}
                    />}
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
                    <Save
                      style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '14px' }}
                      onClick={this.saveDescription}
                    />
                    <Close
                      style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '14px' }}
                      onClick={this.cancel}
                    />
                  </div>

                  : <div className='flex align-items-center' style={{ height: '32px' }}>
                    <p style={{ margin: 0 }}>{routine.desc || 'No description'}</p>
                    {isOwnRoutine && <Edit
                      style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '14px' }}
                      onClick={this.editDescription}
                    />}
                  </div>
              }

            </div>
            <div style={{ margin: '40px 0' }}>
              {
                Object.keys(routine.days).map((day, i) => {
                  const exerciseList = type === day ? this.state.editing.value : routine.days[day]
                  if (!exerciseList) return null

                  return (
                    <div key={i} style={{ marginBottom: '40px' }}>
                      <div className='flex'>
                        <h2>{days[day]}</h2>
                        {
                          type === day ? <div>
                            <Save
                              style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '14px' }}
                              onClick={this.saveDay}
                            />
                            <Close
                              style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '14px' }}
                              onClick={this.cancel}
                            />
                          </div>
                            : isOwnRoutine && <Edit
                              style={{ color: 'black', cursor: 'pointer', marginLeft: '10px', fontSize: '14px' }}
                              onClick={() => this.editDay(day)}
                            />
                        }
                      </div>
                      <Paper>
                        <Table style={{ marginBottom: '16px' }}>
                          <TableHead>
                            <TableRow>
                              <TableCell width='67%'>Exercise</TableCell>
                              <TableCell width='14%'>Sets</TableCell>
                              <TableCell width='14%'>Reps</TableCell>
                              <TableCell width='5%'></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              exerciseList.map((e, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>
                                      {type === day
                                        ? <Select value={value[i].exercise} onChange={(e) => this.exerciseOnChange(e, i)} style={{ fontSize: '14px' }}>
                                          {
                                            exercises.map((e, i) => <MenuItem key={i} value={e.name} style={{ fontSize: '14px' }}>{e.name}</MenuItem>)
                                          }
                                        </Select> : <p style={{ margin: 0 }}>{e.exercise}</p>}
                                    </TableCell>
                                    <TableCell>
                                      {type === day
                                        ? <TextField
                                          type='number'
                                          InputProps={{
                                            style: { fontSize: '14px' }
                                          }}
                                          value={value[i].sets}
                                          onChange={(e) => this.setsOnChange(e, i)}
                                        /> : <p style={{ margin: 0 }}>{e.sets}</p>}
                                    </TableCell>
                                    <TableCell>
                                      {type === day
                                        ? <TextField
                                          type='number'
                                          InputProps={{
                                            style: { fontSize: '14px' }
                                          }}
                                          value={value[i].reps}
                                          onChange={(e) => this.repsOnChange(e, i)}
                                        /> : <p style={{ margin: 0 }}>{e.reps}</p>}
                                    </TableCell>
                                    <TableCell>
                                      <div className='flex align-items-center'>
                                        <div style={{ visibility: type === day ? 'visible' : 'hidden', position: 'relative', top: '3px' }}>
                                          <KeyboardArrowUp
                                            style={{ fontSize: '20px', cursor: 'pointer' }}
                                            onClick={() => this.reorderExercise(day, i, 'up')}
                                          />
                                          <KeyboardArrowDown
                                            style={{ fontSize: '20px', cursor: 'pointer' }}
                                            onClick={() => this.reorderExercise(day, i, 'down')}
                                          />
                                        </div>
                                        <Close
                                          style={{ color: 'red', cursor: 'pointer', marginLeft: '10px', fontSize: '22px', visibility: type === day ? 'visible' : 'hidden' }}
                                          onClick={() => this.deleteExercise(i)}
                                        />
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                )
                              })
                            }
                          </TableBody>
                        </Table>
                      </Paper>
                      {type === day &&
                        <p style={{ marginLeft: '4px', cursor: 'pointer' }} onClick={this.addExercise}>Add new exercise +</p>
                      }
                    </div>
                  )
                })
              }
            </div>
            {isOwnRoutine && Object.values(routine.days).filter(e => e).length < 7 &&
              <div className='flex justify-between'>
                <Button id='add-new-day-button' variant='contained' color='primary' onClick={(e) => {
                  e.stopPropagation()
                  this.togglePopover()
                }}>
                Add new day
                </Button>
                <Button variant='contained' style={{ backgroundColor: 'red', color: '#fff' }} onClick={this.deleteRoutine}>
                  {deleting ? 'DELETING..' : 'DELETE ROUTINE'}
                </Button>
              </div>
            }

            {isOwnRoutine && <div className='flex align-items-center' style={{ marginTop: '20px' }}>
              <p style={{ margin: 0 }}>Private:</p>
              <Checkbox
                checked={routine.private || false}
                onChange={this.setPrivate}
                color="primary"
                inputProps={{
                  'aria-label': 'secondary checkbox'
                }}
              />
            </div>}
            <Popover
              style={{ backgroundColor: 'rgb(0,0,0,0.5)' }}
              open={popover}
              anchorEl={document.getElementById('add-new-day-button')}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <div onClick={e => e.stopPropagation()} style={{ padding: '0', minWidth: '150px', maxWidth: '300px', border: '1px solid black', borderRadius: '4px' }}>
                <List style={{ padding: 0 }}>
                  {
                    Object.keys(days).map((d, i) => {
                      if (!routine.days[d]) {
                        return (
                          <ListItem key={i} button style={{ padding: '5px 20px' }} onClick={() => this.addDay(d)}>
                            <ListItemText
                              style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                              primary={d}
                            />
                          </ListItem>
                        )
                      }
                    })
                  }
                </List>
              </div>
            </Popover>
          </div>
        }

      </Container>
    )
  }
}

export default connect(state => ({
  userId: state.user.id
}))(ViewRoutine)
