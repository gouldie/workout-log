import * as types from './types'

export const IS_AUTHENTICATED = (isAuthenticated) => ({
  type: types.IS_AUTHENTICATED,
  isAuthenticated
})
