/* eslint-disable no-unused-vars */
import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import CloseIcon from '@material-ui/icons/Close'

export const SearchBar = ({ onChange, value, onClear }) => (
  <TextField
    className='search-bar'
    InputProps={{
      endAdornment: (
        <InputAdornment position="start">
          <CloseIcon style={{ color: 'gray', cursor: 'pointer' }} onClick={onClear} />
        </InputAdornment>
      )
    }}
    value={value}
    onChange={onChange}
    placeholder='Search'
  />
)
