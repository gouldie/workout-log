import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

export default ({ data }) => {
  return (
    <Link to={`/routine/${data._id}`}>
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
    </Link>
  )
}
