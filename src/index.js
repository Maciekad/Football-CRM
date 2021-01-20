import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import history from "./utils/history";



const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain="dev-hjad2sh8.eu.auth0.com"
    clientId="SRCNsVe3P4jjbVnYzo165WsDwROIWBYR"
    redirectUri={window.location.origin}
    audience="http://localhost:62075/api"
    onRedirectCallback={onRedirectCallback}
  >
    <React.StrictMode>
      <Router history={history}>
        <App />
      </Router>
    </React.StrictMode>
    ,
  </Auth0Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
