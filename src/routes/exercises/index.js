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
import Chip from '@material-ui/core/Chip'

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
      wrapped: false
    }
  }

  componentDidMount () {
    this.setState({
      wrapped: this.hasWrapped()
    })

    window.addEventListener('resize', () => {
      this.setState({
        wrapped: this.hasWrapped()
      })
    })
  }

  hasWrapped = () => {
    const wrapper = document.querySelector('.MuiContainer-root')
    const exerciseContainer = document.querySelector('.exercise-container')
    const filterContainer = document.querySelector('.filter-container')

    return !!((wrapper.offsetWidth - 88) < (exerciseContainer.offsetWidth + filterContainer.offsetWidth))
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

  render () {
    const { search, filters, wrapped } = this.state

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
      <Container maxWidth='md' className={`flex wrap ${wrapped ? 'wrapped justify-center' : 'justify-center'}`}>
        <div style={{ width: '20px' }}></div>
        <div className='filter-container'>
          <div style={{ marginBottom: '10px' }}>
            <SearchBar
              value={search}
              onChange={this.searchBarOnChange}
              onClear={this.clearSearchBar}
            />
          </div>
          <div>
            {
              Object.keys(filterList).map((f, i) => {
                return (
                  <div key={i} style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
                    {
                      true
                        ? <div>
                          <p style={{ marginBottom: '10px' }}>{filterList[f].label}</p>
                          <FormControl style={{ width: '200px' }}>
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
                                  {m}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        : <div>
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
                    }

                  </div>
                )
              })
            }
          </div>
        </div>
        <div style={{ width: '20px' }}></div>
        <div className='exercise-container flex column align-items-center' style={{ }}>
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
