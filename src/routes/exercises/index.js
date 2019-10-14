import React, { Component } from 'react'
import exercises from '../../assets/json/exercises.json'
import Exercise from '../../components/exercises/exercise'
import { Container, Checkbox, FormControlLabel, Input, InputLabel, MenuItem, FormControl, Select, ListItemText } from '@material-ui/core'
import { SearchBar, Snackbar } from '../../components/core'
import axios from 'axios'
import AddToRoutine from '../../components/exercises/add'
import { connect } from 'react-redux'

const filterList = {
  muscles: {
    label: 'Muscles worked',
    options: ['Biceps', 'Triceps', 'Chest']
  },
  equipment: {
    label: 'Equipment required',
    options: ['Barbell', 'EZ-Bar', 'Cables']
  }
}

class Exercises extends Component {
  constructor () {
    super()

    this.state = {
      search: '',
      filters: {
        muscles: filterList.muscles.options.map(e => e),
        equipment: filterList.equipment.options.map(e => e)
      },
      popover: {
        anchor: null,
        exercise: null
      },
      routines: [],
      expand: null,
      snackbar: {
        open: false,
        message: null
      }
    }
  }

  componentDidMount () {
    this.getRoutines()
  }

  getRoutines = () => {
    axios.get('/api/routines')
      .then(res => {
        this.setState({ routines: res.data.routines.filter(r => r.userId === this.props.userId) })
      })
  }

  searchBarOnChange = (e) => {
    this.setState({ search: e.target.value })
  }

  clearSearchBar = () => {
    this.setState({ search: '' })
  }

  filterOnCheck = (type, option) => {
    if (typeof option === 'object') {
      this.setState({
        filters: {
          ...this.state.filters,
          [type]: option
        }
      })
      return
    }

    const currentFilters = this.state.filters

    const index = currentFilters[type].indexOf(option)

    if (index >= 0) {
      currentFilters[type].splice(index, 1)
    } else {
      currentFilters[type].push(option)
    }

    this.setState({ filters: currentFilters })
  }

  iconOnClick = (e, icon, exercise, anchor) => {
    e.stopPropagation()
    if (icon === 'add') {
      // show popover
      this.setState({
        popover: {
          anchor,
          exercise
        }
      })
    }
  }

  closePopover = () => {
    this.setState({
      popover: {
        anchor: null,
        exercise: null
      },
      expand: null
    })
  }

  toggleExpand = (i) => {
    this.setState({ expand: this.state.expand === i ? null : i })
  }

  addToRoutine = (exercise, routineId, day) => {
    axios.post('/api/routine/exercise', { exercise, routineId, day })
      .then(res => {
        this.closePopover()
        this.openSnackbar('Exercise added.', 'success')
      })
      .catch(err => {
        console.log('err', err)
        this.openSnackbar('An error occurred. Please try again.', 'error')
      })
  }

  openSnackbar = (message, variant) => {
    this.setState({
      snackbar: {
        open: true,
        message,
        variant
      }
    })
  }

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        open: false,
        message: null
      }
    })
  }

  render () {
    const { search, filters, popover, routines, expand, snackbar } = this.state
    const { isAuthenticated } = this.props

    const filteredExercises = exercises && exercises.filter(e => {
      const searchMatch = e.name.toLowerCase().includes(search.toLowerCase())

      if (!searchMatch) return false

      const filtersMatch = []

      Object.keys(filters).forEach(k => {
        e[k].forEach(e => {
          if (filters[k].includes(e)) {
            if (!filtersMatch.includes(k)) filtersMatch.push(k)
          }
        })
      })

      if (filtersMatch.length < Object.keys(filters).length) return false

      return true
    })

    return (
      <Container id='exercises-container' maxWidth='md' className='flex justify-center' onClick={this.closePopover}>
        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          onClose={this.closeSnackbar}
          variant={snackbar.variant}
        />
        <div style={{ width: '20px' }}></div>
        {filteredExercises && <div className='filter-container'>
          <div style={{ marginBottom: '10px' }}>
            <SearchBar
              value={search}
              onChange={this.searchBarOnChange}
              onClear={this.clearSearchBar}
            />
          </div>
          <div className='filter-list'>
            {
              Object.keys(filterList).map((f, i) => {
                return (
                  <div key={i} style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
                    <div id='select-filters'>
                      <p style={{ marginBottom: '10px' }}>{filterList[f].label}</p>
                      <FormControl style={{ width: '100%' }}>
                        {/* <InputLabel htmlFor="select-multiple">Name</InputLabel> */}
                        <Select
                          multiple
                          value={filters[f]}
                          renderValue={selected => selected.join(', ')}
                          onChange={(e) => this.filterOnCheck(f, e.target.value)}
                          input={<Input id="select-multiple" />}
                          MenuProps={{ PaperProps: { style: { width: '250px' } } }}

                        >
                          {filterList[f].options.map((m, i) => (
                            <MenuItem key={m} value={m}>
                              <Checkbox color='primary' checked={filters[f].indexOf(m) > -1} />
                              <ListItemText primary={m} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div id='checkbox-filters'>
                      <p style={{ marginBottom: '10px' }}>{filterList[f].label}</p>
                      {
                        filterList[f].options.map((m, i) => {
                          return (
                            <div key={i}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name={m}
                                    value={m}
                                    color='primary'
                                    style={{ padding: '5px 9px' }}
                                    onChange={() => this.filterOnCheck(f, m)}
                                    checked={filters[f].includes(m)}
                                  />
                                }
                                label={m}
                              />
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>}
        <div style={{ width: '20px' }}></div>
        <div className='exercise-container flex column align-items-center' style={{ }}>
          <AddToRoutine
            routines={routines}
            popover={popover}
            expand={expand}
            toggleExpand={this.toggleExpand}
            addToRoutine={this.addToRoutine}
          />
          {
            filteredExercises && filteredExercises.map((e, i) => (
              <Exercise
                key={i}
                data={{ ...e }}
                onClick={this.iconOnClick}
                isAuthenticated={isAuthenticated}
                openSnackbar={this.openSnackbar}
              />
            ))
          }
        </div>
        <div style={{ width: '20px' }}></div>
      </Container>
    )
  }
}

export default connect(state => ({
  isAuthenticated: state.user.isAuthenticated,
  userId: state.user.id
}))(Exercises)
