import React from 'react'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default ({ data }) => {
  return (
    <Link to={`/routine/${data._id}`}>
      <Paper className='exercise flex justify-between align-items-start'>
        <div className='flex column justify-between' style={{ height: '100%', width: '100%' }}>
          <div className='flex justify-between'>
            <div>
              <strong style={{ marginBottom: '10px' }}>{data.name}</strong>
              <p>{data.desc || 'No description'}</p>
            </div>
            <p style={{ marginBottom: '10px' }}>{`${Object.keys(data.days).length} days/week`}</p>
          </div>
          <div className='flex justify-between'>
            <p style={{ margin: 0, fontStyle: 'italic' }}>Created at: {data.createdAt && new Date(data.createdAt).toLocaleDateString()}</p>
            <p style={{ margin: 0, fontStyle: 'italic' }}>Updated at: {data.updatedAt && new Date(data.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

      </Paper>
    </Link>
  )
}
