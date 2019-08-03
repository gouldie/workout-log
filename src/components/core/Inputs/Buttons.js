import React from 'react'
import Button from '@material-ui/core/Button'

export const ContainedButton = ({ label, color, float, onClick }) => (
  <Button variant='contained' color={color || 'primary'} style={{ float, marginTop: '20px' }} onClick={onClick}>
    {label}
  </Button>
)
