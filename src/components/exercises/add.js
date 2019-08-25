/* eslint-disable no-unused-vars */
import React from 'react'
import Popover from '@material-ui/core/Popover'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText'

export default ({ popover, routines, expand, addToRoutine, toggleExpand }) => (
  <Popover
    style={{ backgroundColor: 'rgb(0,0,0,0.5)' }}
    open={!!popover.anchor}
    anchorEl={popover.anchor}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
  >
    <div onClick={(e) => e.stopPropagation()} style={{ padding: '20px 0 5px', minWidth: '150px', maxWidth: '300px', border: '1px solid black', borderRadius: '4px' }}>
      <p style={{ fontWeight: 'bold', padding: '0 20px 8px' }}>Add to routine</p>
      <List style={{ padding: 0 }}>
        {
          routines.map((r, i) => (
            <div key={i}>
              <ListItem button style={{ padding: '5px 20px' }}>
                <ListItemText style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} primary={r.name} onClick={() => toggleExpand(i)} />
              </ListItem>
              {
                <Collapse in={expand === i} timeout="auto" unmountOnExit>
                  <Divider />
                  <List style={{ padding: 0 }}>
                    {
                      Object.keys(r.days).length > 0
                        ? <div>
                          {
                            Object.keys(r.days).map((d, i) => (
                              <ListItem key={i} button style={{ padding: '5px 0 5px 30px' }}>
                                <ListItemText primary={`Add to ${d}`} onClick={() => addToRoutine(popover.exercise.name, r._id, d)} />
                              </ListItem>
                            ))
                          }
                        </div>
                        : <p>No days found</p>
                    }
                  </List>
                </Collapse>
              }
              {i < (routines.length - 1) && <Divider />}
            </div>
          ))
        }
      </List>
    </div>
  </Popover>
)
