import React from 'react'
import Paper from '@material-ui/core/Paper'

export default ({ data }) => {
  return (
    <Paper className='exercise flex justify-between align-items-center'>
      <div className='flex column justify-start' style={{ height: '100%' }}>
        <p style={{ marginBottom: '10px' }}>{data.name}</p>
        <p style={{ marginBottom: '10px' }}>{`${Object.keys(data.days).length} days/week`}</p>
        {/* <p>Equipment: {data.equipment && data.equipment.join(', ')}</p> */}
      </div>
      <div style={{ width: '140px' }}>
        {/* <img src={data.img} style={{ width: '100%' }} /> */}
      </div>
    </Paper>
  )
}
