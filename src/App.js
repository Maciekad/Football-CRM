import React, { useEffect, useState } from 'react';
import { store } from './actions/store';
import { Provider } from 'react-redux';
import {Route, Redirect, Switch } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import RegistrationPage from './components/RegistrationPage';
import UserProfile from './components/UserProfile';
import Fixtures from './components/Fixtures';
import Team from './components/Team';
import MatchDetails from './components/MatchDetails';
import Tickets from './components/Tickets';
import HomePage from './components/HomePage';
import Settings from './components/Settings';
import Results from './components/Results';
import Drawer from './components/Drawer';
import TicketsBooking from './components/TicketsBooking';
import Matches from './components/admin/Matches';
import Players from './components/admin/Players';
import Teams from './components/admin/Teams';
import Bookings from './components/admin/Bookings';
import MatchForm from './components/admin/MatchForm';
import PlayerForm from './components/admin/PlayerForm';
import TeamForm from './components/admin/TeamForm';
import NotFound from './components/NotFound';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { withAuthenticationRequired, useAuth0} from '@auth0/auth0-react';

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

export default function App() {
  
  const { user } = useAuth0();
  const role = 'https://schemas.dev-hjad2sh8.com/roles';
  return (
    <Provider store={store}>
        <div
          css={css`
            display: inline-flex;
            width: 100%;
            height: 100%;
          `}
        >           
           <Drawer />
          <Switch>
            <Redirect from="/home" to="/" />
            <Route exact path="/" component={HomePage} />
            <ProtectedRoute path="/myaccount/profile" component={UserProfile} />
            <Route path="/fixtures" component={Fixtures} />
            <Route path="/team" component={Team} />
            <Route path="/match/:homeTeam/:score/:awayTeam/" component={MatchDetails} />
            <Route path="/myaccount/tickets" component={Tickets} />
            <Route path="/settings" component={Settings} />
            <Route path="/results" component={Results} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/register" component={RegistrationPage} />
            <ProtectedRoute exact path="/ticketsbooking/:id" component={TicketsBooking} />
            {user && user[role] === "admin" && (
            <Route path="/admin/matches" component={Matches} />
            )}
            {user && user[role] === "admin" && (
            <Route path="/admin/players" component={Players} />
            )}
            {user && user[role] === "admin" && (
            <Route path="/admin/teams" component={Teams} />
            )}
            {user && user[role] === "admin" && (
            <Route path="/admin/bookings" component={Bookings} />
            )}
            {user && user[role] === "admin" && (
            <Route path="/admin/addMatch" component={MatchForm} />
            )} 
            {user && user[role] === "admin" && (
            <Route path="/admin/addPlayer" component={PlayerForm} />
            )}        
            {user && user[role] === "admin" && (
            <Route path="/admin/addTeam" component={TeamForm} />
            )}  
            <Route component={NotFound}/>       
          </Switch>
        </div>
    </Provider>
  );
}

