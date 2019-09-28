import * as types from '../actions/types'

const initialState = {
  id: null,
  isAuthenticated: false
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case types.IS_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      }
    }
    case types.USER_ID: {
      return {
        ...state,
        id: action.id
      }
    }
    default: {
      return state
    }
  }
}
