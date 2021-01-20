import { bookings } from "./api";

export const ACTION_TYPES = {
    CREATE : "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    FETCH_ALL: "FETCH_ALL"
}

export const fetchAll = () => dispatch => {
    //get api request
    bookings().fetchAll()
    .then(response => {
      console.log(response)
        dispatch({
          type: ACTION_TYPES.FETCH_ALL,
          payload: response.data
        })
      })
    .catch(err => console.log(err))
   
 }

 export const create = (data, onSuccess) => dispatch => {
  bookings().create(data)
      .then(res => {
          dispatch({
              type: ACTION_TYPES.CREATE,
              payload: res.data
          })
          onSuccess()
      })
      .catch(err => console.log(err))
}


