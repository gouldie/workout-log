import React from 'react'
import Button from '@material-ui/core/Button'

export const ContainedButton = ({ type = 'text', label, color, float, onClick }) => (
  <Button type={type} variant='contained' color={color || 'primary'} style={{ float, marginTop: '20px' }} onClick={onClick}>
    {label}
  </Button>
)
