/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import exercises from '../../assets/json/exercises.json'
import Exercise from '../../components/exercises/exercise'
import Container from '@material-ui/core/Container'
import { SearchBar } from '../../components/core'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import ListItemText from '@material-ui/core/ListItemText'
import Popover from '@material-ui/core/Popover'
import Popper from '@material-ui/core/Popper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import axios from 'axios'
import Collapse from '@material-ui/core/Collapse'

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
        muscles: [],
        equipment: []
      },
      popover: {
        anchor: null,
        exercise: null
      },
      routines: [],
      expand: null
    }
  }

  componentDidMount () {
    this.getRoutines()
  }

  getRoutines = () => {
    axios.get('/api/routines')
      .then(res => {
        this.setState({ routines: res.data.routines })
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
      }
    })
  }

  toggleExpand = (i) => {
    this.setState({ expand: this.state.expand === i ? null : i })

    // const newExpand = this.state.expand
    // const index = newExpand.indexOf(i)

    // if (index >= 0) {
    //   newExpand.splice(index, 1)
    // } else {
    //   newExpand.push(i)
    // }

    // this.setState({ expand: newExpand })
  }

  render () {
    const { search, filters, popover, routines, expand } = this.state

    const filteredExercises = exercises && exercises.filter(e => {
      const searchMatch = e.name.toLowerCase().includes(search.toLowerCase())

      if (!searchMatch) return false

      let filtersMatch = true

      Object.keys(filters).forEach(k => {
        filters[k].forEach(p => {
          if (!e[k].includes(p)) {
            filtersMatch = false
          }
        })
      })

      if (!filtersMatch) return false

      return true
    })

    return (
      <Container id='exercises-container' maxWidth='md' className='flex justify-center' onClick={this.closePopover}>
        <div style={{ width: '20px' }}></div>
        <div className='filter-container'>
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
                        <InputLabel htmlFor="select-multiple">Name</InputLabel>
                        <Select
                          multiple
                          value={filters[f]}
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
        </div>
        <div style={{ width: '20px' }}></div>
        <div className='exercise-container flex column align-items-center' style={{ }}>
          <Popover
            open={!!popover.anchor}
            anchorEl={popover.anchor}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ padding: '20px 20px 5px', minWidth: '150px', maxWidth: '300px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Add to routine</p>
              <List style={{ padding: 0 }}>
                {
                  routines.map((r, i) => (
                    <div key={i}>
                      <ListItem button style={{ padding: '5px 0' }}>
                        <ListItemText style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} primary={r.name} onClick={() => this.toggleExpand(i)} />
                      </ListItem>
                      {
                        <Collapse in={expand === i} timeout="auto" unmountOnExit>
                          <Divider />
                          <List style={{ padding: 0 }}>
                            {
                              Object.keys(r.days).length > 0
                                ? <div>
                                  {
                                    Object.keys(r.days).map((d, i) => (
                                      <ListItem key={i} button style={{ padding: '5px 0 5px 20px' }}>
                                        <ListItemText primary={`Add to ${d}`} />
                                      </ListItem>
                                    ))
                                  }
                                </div>
                                : <p>No days found</p>
                            }
                          </List>
                        </Collapse>
                      }
                      {i < (routines.length - 1) && <Divider />}
                    </div>
                  ))
                }
              </List>
            </div>
          </Popover>
          {
            filteredExercises && filteredExercises.map((e, i) => (
              <Exercise
                key={i}
                data={{ ...e }}
                onClick={this.iconOnClick}
              />
            ))
          }
        </div>

      </Container>
    )
  }
}

export default Exercises
