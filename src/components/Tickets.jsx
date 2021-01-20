import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import TicketsTable from './TicketsTable';
import { connect } from 'react-redux';
import * as actions from "../actions/tickets";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const Tickets = (props) => {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getTicketsData = async () => {
      const domain = "dev-hjad2sh8.eu.auth0.com";
  
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `http://localhost:62075/api`,
        });

        setLoading(false);
        props.fetchByUser(user.nickname,accessToken)  
      } catch (e) {
        console.log(e.message);
      }
    };
    
    getTicketsData();
  }, []);//componentDidMount

  console.log('here'+props.ticketsList)
    return (
      <div
        css={css`
          margin: 20px 20px 20px 20px;
          display: grid;
          grid-template-rows: 60px 1fr;
          grid-gap: 20px;
          width: 100%;
        `}
      >
        <div
          css={css`
            grid-row: 1/2;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #d3d3d3;
          `}
        >
          <h2>Tickets</h2>
        </div>
        <div
          css={css`
            grid-row: 2/3;
          `}
        >
          {isLoading ? <h1>Loading...</h1> : 
          isAuthenticated ? (
            <TicketsTable tickets={props.ticketsList}/>
          ) : (
            <div
            css={css`
              font-size: 15px;
            `}
            >Find availabale tickets 
              <Link
              to='./fixtures'>
                here
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
 
  const mapStateToProps = state => ({
    ticketsList: state.tickets.list
  })
  
  const mapActionToProps = {
    fetchByUser: actions.fetchByUser
  }
  
  export default connect(mapStateToProps, mapActionToProps)(Tickets);