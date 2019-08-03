import * as types from '../actions/types'

const initialState = {
  user: [],
  dummy: ''
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case types.IS_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      }
    }
    default: {
      return state
    }
  }
}
