import { players } from "./api";

export const ACTION_TYPES = {
    CREATE : "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    FETCH_ALL: "FETCH_ALL",
    FETCH_BY_TEAM: "FETCH_BY_TEAM"
}

export const fetchAll = () => dispatch => {
    //get api request
    players().fetchAll()
    .then(response => {
      console.log(response)
        dispatch({
          type: ACTION_TYPES.FETCH_ALL,
          payload: response.data
        })
      })
    .catch(err => console.log(err))
 }

 export const fetchByTeam = (team) => dispatch => {
    //get api request
    players().fetchByTeam(team)
    .then(response => {
        dispatch({
          type: ACTION_TYPES.FETCH_BY_TEAM,
          payload: response.data
        })
      })
    .catch(err => console.log(err))
   
  }
  

 export const create = (data, onSuccess) => (dispatch) => {
   console.log(data);
   players()
     .create(data)
     .then((res) => {
       dispatch({
         type: ACTION_TYPES.CREATE,
         payload: res.data,
       });
       onSuccess();
     })
     .catch((err) => console.log(err));
 };

export const Delete = (id, onSuccess) => dispatch => {
 players().delete(id)
     .then(res => {
         dispatch({
             type: ACTION_TYPES.DELETE,
             payload: id
         })
         onSuccess()
     })
     .catch(err => console.log(err))
}
