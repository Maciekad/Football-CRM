import axios from "axios"

const baseUrl = "http://localhost:62075/api/";

export const account = (url = baseUrl + 'accounts/') => {
        return{
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }


export const matches = (url = baseUrl + 'matches/') => {
        return{
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }

    export const players = (url = baseUrl + 'players/') => {
        return{
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url+id),
            fetchByTeam: (team) => axios.get(url + team),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }

    export const teams = (url = baseUrl + 'teams/') => {
      return {
        fetchAll: () => axios.get(url),
        fetchById: (id) => axios.get(url + id),
        create: (newRecord) => axios.post(url, newRecord),
        update: (id, updateRecord) => axios.put(url + id, updateRecord),
        delete: (id) => axios.delete(url + id),
      };
    }

    export const bookings = (url = baseUrl + 'bookings/') => {
        return {
          fetchAll: () => axios.get(url),
          fetchById: (id) => axios.get(url + id),
          create: (newRecord) => axios.post(url, newRecord),
          update: (id, updateRecord) => axios.put(url + id, updateRecord),
          delete: (id) => axios.delete(url + id),
        };
      }

      export const tickets = (url = baseUrl + 'tickets/') => {
        return {
          fetchAll: (token) => axios.get(url, { headers: {"Authorization" : `Bearer ` + token} }),
          fetchById: (id) => axios.get(url + id),
          fetchByUser: (username, token) => axios.get(url + username, { headers: {"Authorization" : `Bearer ` + token} }),
          create: (newRecord) => axios.post(url, newRecord),
          update: (id, updateRecord) => axios.put(url + id, updateRecord),
          delete: (id) => axios.delete(url + id),
        };
      }
