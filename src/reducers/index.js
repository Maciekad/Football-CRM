import { combineReducers } from "redux";
import { matches } from "./matches";
import { players } from "./players";
import { teams } from "./teams";
import { bookings } from "./bookings";
import { tickets } from "./tickets";

export const reducers = combineReducers({
    matches,
    players,
    teams,
    bookings,
    tickets
})