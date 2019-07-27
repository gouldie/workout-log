import * as types from '../actions/types'

const initialState = {
  user: [],
  dummy: ''
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_USER: {
      return {
        ...state,
        user: action.user
      }
    }
    default: {
      return state
    }
  }
}
