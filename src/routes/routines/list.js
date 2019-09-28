import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Container, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Select, ListItemText, Checkbox } from '@material-ui/core'
import Routine from '../../components/routines/routine'
import { SearchBar } from '../../components/core'

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
      routines: false,
      search: '',
      own: false,
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

  ownOnCheck = () => {
    this.setState({ own: !this.state.own })
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
    const { isAuthenticated, userId } = this.props
    const { routines, search, filters, own } = this.state

    const daysPerWeek = []
    routines && routines.forEach(e => {
      const days = Object.keys(e.days).length

      if (!daysPerWeek.includes(days)) {
        daysPerWeek.push(days)
      }
    })
    filterList.days.options = daysPerWeek

    const filteredRoutines = routines && routines.filter(e => {
      if (own && e.userId !== userId) return false

      const searchMatch = e.name.toLowerCase().includes(search.toLowerCase())

      if (!searchMatch) return false

      let filtersMatch = true

      Object.keys(filters).forEach(k => {
        let daysMatch = true

        if (k === 'days') {
          if (filters[k].length > 0 && !filters[k].includes(Object.keys(e.days).length)) daysMatch = false
        }

        filtersMatch = daysMatch
      })

      if (!filtersMatch) return false

      return true
    })

    console.log(filters['days'])

    return (
      <Container maxWidth='md'>
        {
          !isAuthenticated
            ? <p style={{ textAlign: 'center' }}>You need to be signed in to view your routines.</p>
            : <div id='routines-container' className='flex justify-center'>
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
                  <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='own'
                          value={own}
                          color='primary'
                          style={{ padding: '5px 9px' }}
                          onChange={this.ownOnCheck}
                          checked={own}
                        />
                      }
                      label='Only show my routines'
                    />
                  </div>
                  {
                    Object.keys(filterList).map((f, i) => {
                      return (
                        <div key={i} style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
                          <div id='select-filters'>
                            <p style={{ marginBottom: '10px' }}>{filterList[f].label}</p>
                            <FormControl style={{ width: '100%' }}>
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
  isAuthenticated: state.user.isAuthenticated,
  userId: state.user.id
}))(Routines)
