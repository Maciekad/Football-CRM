import { ACTION_TYPES } from "../actions/account";
const initialState = {
    list: []
}

export const account = (state=initialState, action)=>{
    switch(action.type){
        case ACTION_TYPES.FETCH_ALL:
            return{
                ...state,
                list:[...action.payload]
            }
        default:
            return state;
        
    }
}