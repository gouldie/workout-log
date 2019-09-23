import React from 'react'
import { InputAdornment, TextField } from '@material-ui/core'
import { Close } from '@material-ui/icons'

export const SearchBar = ({ onChange, value, onClear }) => (
  <TextField
    className='search-bar'
    InputProps={{
      endAdornment: (
        <InputAdornment position="start">
          <Close style={{ color: 'gray', cursor: 'pointer' }} onClick={onClear} />
        </InputAdornment>
      )
    }}
    value={value}
    onChange={onChange}
    placeholder='Search'
  />
)
