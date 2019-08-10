import React, { Component } from 'react'
import exercises from '../../assets/json/exercises.json'
import Exercise from '../../components/exercises/exercise'
import Container from '@material-ui/core/Container'
import { SearchBar } from '../../components/core'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const filterList = {
  muscles: {
    label: 'Muscles worked',
    options: ['Biceps', 'Triceps', 'Chest']
  }
}

class Exercises extends Component {
  constructor () {
    super()

    this.state = {
      search: '',
      filters: {
        muscles: []
      }
    }
  }

  searchBarOnChange = (e) => {
    this.setState({ search: e.target.value })
  }

  clearSearchBar = () => {
    this.setState({ search: '' })
  }

  filterOnCheck = (type, option) => {
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
    const { search, filters } = this.state

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
      <Container maxWidth='md' style={{ display: 'flex' }}>
        <div style={{ marginRight: '40px' }}>
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
                  <div key={i} style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px' }}>
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
                )
              })
            }
          </div>
        </div>
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
