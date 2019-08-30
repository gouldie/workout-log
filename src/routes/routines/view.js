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
      <Container className='flex column align-items-center'>
        {routine === null && <Loader />}
        {routine === false && <h1>Routine not found</h1>}
        {
          routine &&
          <div style={{ width: '100%', maxWidth: '800px', textAlign: 'left' }}>
            <h2>{routine.name}</h2>
            <p>{routine.description || 'No description'}</p>
            <div style={{ marginTop: '50px' }}>
              {
                Object.keys(routine.days).map((day, i) => {
                  return (
                    <div key={i}>
                      <h2>{day}</h2>
                      <Paper>
                        <Table style={{ marginBottom: '16px' }}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Exercise</TableCell>
                              <TableCell>Sets</TableCell>
                              <TableCell>Reps</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              routine.days[day].map((e, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell>{e.exercise}</TableCell>
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
