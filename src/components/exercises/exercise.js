import React from 'react'
import { Paper } from '@material-ui/core'

export default ({ data, onClick, isAuthenticated, openSnackbar }) => {
  return (
    <Paper className='exercise flex justify-between align-items-center'>
      <div className='flex column justify-between' style={{ height: '100%' }}>
        <div>
          <p style={{ marginBottom: '10px' }}>{data.name}</p>
          <p style={{ marginBottom: '10px' }}>{data.muscles && data.muscles.join(', ')}</p>
          <p>Equipment: {data.equipment && data.equipment.join(', ')}</p>
        </div>
        <i
          id={`${data.name}`}
          title='Add to routine'
          className="fas fa-plus"
          style={{ color: 'green', cursor: 'pointer', width: '16px' }}
          onClick={(e) => {
            if (isAuthenticated) {
              onClick(e, 'add', data, document.getElementById(data.name))
            } else {
              openSnackbar('You need to be signed in to do that.', 'info')
            }
          }}
        >
        </i>
      </div>
      <div style={{ width: '140px' }}>
        <img src={data.img} style={{ width: '100%' }} />
      </div>
    </Paper>
  )
}
