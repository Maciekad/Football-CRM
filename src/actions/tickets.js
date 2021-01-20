import { tickets } from "./api";

export const ACTION_TYPES = {
    CREATE : "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    FETCH_ALL: "FETCH_ALL",
    FETCH_BY_USER: "FETCH_BY_USER"
}

const formatData = data => ({
  ...data,
  matchId: parseInt(data.matchId ? data.matchId : 0),
  accountId: parseInt(data.accountId ? data.accountId : 0),
  amount: parseInt(data.amount ? data.amount : 0),
  purchaseDate: (new Date(Date.now())).toJSON(),
})

export const fetchAll = (token) => dispatch => {
  //get api request
  tickets().fetchAll(token)
  .then(response => {
    console.log(response)
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data
      })
    })
  .catch(err => console.log(err))
 
}

export const fetchByUser = (username, token) => dispatch => {
  //get api request
  tickets().fetchByUser(username, token)
  .then(response => {
    localStorage.setItem('tickets', JSON.stringify(response.data))
    console.log(response)
      dispatch({
        type: ACTION_TYPES.FETCH_BY_USER,
        payload: response.data
      })
    })
  .catch(err => console.log(err))
 
}


export const create = (data, onSuccess) => dispatch => {
  data = formatData(data)
    console.log(data)
  tickets().create(data)
      .then(response => {
          dispatch({
              type: ACTION_TYPES.CREATE,
              payload: response.data
          })
          onSuccess()
      })
      .catch(err => console.log(err+"shit"))
}
