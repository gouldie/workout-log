import { combineReducers } from 'redux'

import user from './user'
import accounts from './accounts'

const rootReducer = combineReducers({
  user,
  accounts
})

export default rootReducer
