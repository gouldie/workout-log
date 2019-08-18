import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import Routine from '../../components/routines/routine'
import { SearchBar } from '../../components/core'

class Routines extends Component {
  constructor () {
    super()

    this.state = {
      search: '',
      routines: false
    }
  }

  componentDidMount () {
    axios.get('/api/routines')
      .then(res => {
        console.log('res', res)
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

  render () {
    const { isAuthenticated } = this.props
    const { routines, search } = this.state

    const filteredRoutines = routines && routines.filter(e => {
      const searchMatch = e.name.toLowerCase().includes(search.toLowerCase())

      if (!searchMatch) return false

      // let filtersMatch = true

      // Object.keys(filters).forEach(k => {
      //   filters[k].forEach(p => {
      //     if (!e[k].includes(p)) {
      //       filtersMatch = false
      //     }
      //   })
      // })

      // if (!filtersMatch) return false

      return true
    })

    return (
      <Container id='routines-container' maxWidth='md'>
        {
          !isAuthenticated
            ? <p style={{ textAlign: 'center' }}>You need to be signed in to create a routine.</p>
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
