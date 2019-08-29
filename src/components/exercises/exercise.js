import React from 'react'
import Paper from '@material-ui/core/Paper'

export default ({ data, onClick, isAuthenticated }) => {
  return (
    <Paper className='exercise flex justify-between align-items-center'>
      <div className='flex column justify-between' style={{ height: '100%' }}>
        <div>
          <p style={{ marginBottom: '10px' }}>{data.name}</p>
          <p style={{ marginBottom: '10px' }}>{data.muscles && data.muscles.join(', ')}</p>
          <p>Equipment: {data.equipment && data.equipment.join(', ')}</p>
        </div>
        {isAuthenticated && <i
          id={`${data.name}`}
          title='Add to routine'
          className="fas fa-plus"
          style={{ color: 'green', cursor: 'pointer', width: '16px' }}
          onClick={(e) => onClick(e, 'add', data, document.getElementById(data.name))}
        >
        </i>}
      </div>
      <div style={{ width: '140px' }}>
        <img src={data.img} style={{ width: '100%' }} />
      </div>
    </Paper>
  )
}
