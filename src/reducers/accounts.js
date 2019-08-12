import * as types from '../actions/types'

const initialState = {
  modal: null
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case types.MODAL: {
      return {
        ...state,
        modal: state.modal === action.modal ? null : action.modal
      }
    }
    default: {
      return state
    }
  }
}
