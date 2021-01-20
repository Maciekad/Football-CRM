import { matches } from "./api";

export const ACTION_TYPES = {
    CREATE : "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    FETCH_ALL: "FETCH_ALL"
}

export const fetchAll = () => dispatch => {
    //get api request
    matches().fetchAll()
    .then(response => {
        dispatch({
          type: ACTION_TYPES.FETCH_ALL,
          payload: response.data
        })
      })
    .catch(err => console.log(err))
   
 }

 export const fetchById = (Id) => dispatch => {
   matches().fetchById(Id)
   .then(response => {
     console.log(response)
     dispatch({
       type: ACTION_TYPES.FETCH_ALL
     })
   })
 }

 export const create = (data, onSuccess) => dispatch => {
   console.log(data)
  matches().create(data)
      .then(res => {
          dispatch({
              type: ACTION_TYPES.CREATE,
              payload: res.data
          })
          onSuccess()
      })
      .catch(err => console.log(err))
}

 export const Delete = (id, onSuccess) => dispatch => {
  matches().delete(id)
      .then(res => {
          dispatch({
              type: ACTION_TYPES.DELETE,
              payload: id
          })
          onSuccess()
      })
      .catch(err => console.log(err))
}