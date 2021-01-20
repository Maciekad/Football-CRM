import { ACTION_TYPES } from "../actions/bookings";
const initialState = {
    list: []
}

export const bookings = (state=initialState, action)=>{
    switch (action.type) {
      case ACTION_TYPES.FETCH_ALL:
        return {
          ...state,
          list: [...action.payload],
        };
      default:
        return state;
      case ACTION_TYPES.CREATE:
        return {
          ...state,
          list: [...state.list, action.payload],
        };
    }
}