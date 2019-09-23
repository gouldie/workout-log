import React from 'react'
import { Button } from '@material-ui/core'

export const ContainedButton = ({ type = 'text', label, color, float, onClick }) => (
  <Button type={type} variant='contained' color={color || 'primary'} style={{ float, marginTop: '20px' }} onClick={onClick}>
    {label}
  </Button>
)

export const SubmitButton = ({ submitting = false }) => (
  <Button type='submit' varant='contained' style={{ backgroundColor: 'green', color: 'white', padding: '6px 15px' }}>
    {submitting ? 'Submitting' : 'Submit'}
  </Button>
)
