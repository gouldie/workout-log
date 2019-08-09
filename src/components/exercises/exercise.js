import React from 'react'
import Paper from '@material-ui/core/Paper'

export default ({ data }) => {
  return (
    <Paper className='exercise flex justify-between align-items-center' style={{
      maxWidth: '500px',
      border: '1px solid #403939',
      height: '100px',
      marginBottom: '20px',
      padding: '10px',
      borderRadius: '5px'
    }}>
      <div className='flex column justify-start' style={{ height: '100%' }}>
        <p style={{ marginBottom: '10px' }}>{data.name}</p>
        <p style={{ marginBottom: '10px' }}>{data.muscles && data.muscles.join(', ')}</p>
        <p>Equipment: {data.equipment && data.equipment.join(', ')}</p>
      </div>
      <div style={{ width: '140px' }}>
        <img src={data.img} style={{ width: '100%' }} />
      </div>
    </Paper>
  )
}
