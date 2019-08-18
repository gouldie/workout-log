import React from 'react'
import Paper from '@material-ui/core/Paper'

export default ({ data }) => {
  return (
    <Paper className='exercise flex justify-between align-items-start'>
      <div className='flex column justify-between' style={{ height: '100%' }}>
        <div>
          <strong>Name</strong>
          <p style={{ marginBottom: '10px' }}>{data.name}</p>
        </div>
        <div>
          <strong>Description</strong>
          <p>{data.desc}</p>
        </div>
      </div>
      <p style={{ marginBottom: '10px' }}>{`${Object.keys(data.days).length} days/week`}</p>
    </Paper>
  )
}
