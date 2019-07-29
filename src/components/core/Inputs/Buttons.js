import React from 'react'
import Button from '@material-ui/core/Button'

export const ContainedButton = ({ label, color, float }) => (
  <Button variant='contained' color={color || 'primary'} style={{ float, marginTop: '20px' }}>
    {label}
  </Button>
)
