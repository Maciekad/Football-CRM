import React, { Component } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';

const UpcomingMatch = (props) => {
  const { match } = props;
  const { match: {matchId, homeTeam, awayTeam, stadium, date} = {} } = props;
  const data = {
    "Arsenal FC" : "./arsenal.png",
    "Fulham FC" : "./fulham.png",
    "Leeds Utd" : "./leeds.png",
    "Manchester Utd" : "./manchesterUtd.png",
    "Manchester City" : "./manchesterCity.png"
  }
    return (
      <div
        css={css`
          grid-row: 2/3;
          grid-column: 1/2;
          border: 1px solid black;
          border-radius: 5px;
          margin: 10px;
          background: #001433;
          color: white;
          display: grid;
          grid-template-rows: 1fr 2fr 1fr;
          grid-template-columns: 2fr 3fr 2fr;
          font-size: 14px;
        `}
      >
        <p
          css={css`
            grid-row: 1/2;
            align-self: left;
            margin: 10px;
          `}
        >
          {date} | {stadium}
        </p>
        <div
          css={css`
            grid-row: 2/3;
            grid-column: 1/4;
            align-self: center;
            border-bottom: 1px solid grey;
            border-top: 1px solid grey;
            display: flex;
            justify-content: space-between;
          `}
        >
          <img
            css={css`
              margin-left: 10px;
            `}
            src={data[homeTeam]}
          />
          <div
            css={css`
              padding: 40px;
            `}
          >
            <div
              css={css`
                text-decoration: none;
                color: white;
                font-size: 22px;
                :hover {
                  color: red;
                  transition: 0.3s;
                }
              `}
            >
              {homeTeam} vs {awayTeam}
            </div>
          </div>
          <img
            css={css`
              margin-right: 10px;
            `}
            src={data[awayTeam]}
          />
        </div>
        <Link
          to={{
            pathname: `/ticketsbooking/${matchId}`
          }}
          css={css`
            grid-column: 1/2;
            grid-row: 3/4;
            margin: 10px;
            padding: 10px;
            text-decoration: none;
            color: white;
            :hover {
              color: red;
              transition: 0.3s;
            }
          `}
        >
          Book ticket {">"}
        </Link>
      </div>
    );
}

export default UpcomingMatch;