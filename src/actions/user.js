import * as types from './types'

export const isAuthenticated = (isAuthenticated) => ({
  type: types.IS_AUTHENTICATED,
  isAuthenticated
})

export const setId = (id) => ({
  type: types.USER_ID,
  id
})
