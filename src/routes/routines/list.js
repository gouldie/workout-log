/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import Routine from '../../components/routines/routine'
import { SearchBar } from '../../components/core'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'

const filterList = {
  days: {
    label: 'Days per week',
    options: []
  }
}

class Routines extends Component {
  constructor () {
    super()

    this.state = {
      search: '',
      routines: false,
      filters: {
        days: []
      }
    }
  }

  componentDidMount () {
    axios.get('/api/routines')
      .then(res => {
        this.setState({ routines: res.data.routines })
      })
      .catch(err => {
        console.log('err', err)
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

  render () {
    const { isAuthenticated } = this.props
    const { routines, search, filters } = this.state

    const daysPerWeek = []
    routines && routines.forEach(e => {
      const days = Object.keys(e.days).length

      if (!daysPerWeek.includes(days)) {
        daysPerWeek.push(days)
      }
    })
    filterList.days.options = daysPerWeek

    const filteredRoutines = routines && routines.filter(e => {
      const searchMatch = e.name.toLowerCase().includes(search.toLowerCase())

      if (!searchMatch) return false

      let filtersMatch = true

      Object.keys(filters).forEach(k => {
        filters[k].forEach(p => {
          if (k === 'days') {
            if (Object.keys(e.days).length !== p) {
              filtersMatch = false
            }
          } else {
            if (!e[k].includes(p)) {
              filtersMatch = false
            }
          }
        })
      })

      if (!filtersMatch) return false

      return true
    })

    return (
      <Container id='routines-container' maxWidth='md'>
        {
          !isAuthenticated
            ? <p style={{ textAlign: 'center' }}>You need to be signed in to view your routines.</p>
            : <div className='flex justify-center'>
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
                                          name={String(m)}
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
              <div className='routine-container'>
                {
                  filteredRoutines && filteredRoutines.map((r, i) => (
                    <Routine key={i} data={r} />
                  ))
                }
              </div>
            </div>
        }
      </Container>
    )
  }
}

export default connect(state => ({
  isAuthenticated: state.user.isAuthenticated
}))(Routines)
