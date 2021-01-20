import React, { Component, useContext, useEffect } from 'react';   
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PlayersList from './PlayersList';
import { Link } from 'react-router-dom';

const MatchDetails = (props) => {
    const homeTeam = props.match.params.homeTeam;
    const awayTeam = props.match.params.awayTeam;
    const score = props.match.params.score;
     
  const data = {
    "Arsenal FC" : "../../../arsenal.png",
    "Fulham FC" : "../../../fulham.png",
    "Leeds Utd" : "../../../leeds.png",
    "Manchester Utd" : "../../../manchesterUtd.png",
    "Manchester City" : "../../../manchesterCity.png"
  }

    return (
      <div
        css={css`
          width: 100%;
          margin: 70px 20px 10px 20px;
        `}
      >
        <div
          css={css`
            grid-row: 2/3;
            grid-column: 1/2;
            border: 1px solid black;
            border-radius: 5px;
            background: #001433;
            color: white;
            display: grid;
            grid-template-rows: 1fr 2fr 1fr;
            grid-template-columns: 2fr 3fr 2fr;
            font-size: 14px;
            width: 100%;
          `}
        >
          <p
            css={css`
              grid-row: 1/2;
              align-self: left;
              margin: 10px;
            `}
          >
            Match details
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
                  display: flex;
                  font-size: 22px;
                `}
              >
                <div>{homeTeam} </div>{" "}
                <div
                  css={css`
                    margin: 0px 10px 0px 10px;
                  `}
                >
                  {score}
                </div>{" "}
                <div>{awayTeam}</div>
              </div>
            </div>
            <img
              css={css`
                margin-right: 10px;
              `}
              src={data[awayTeam]}
            />
          </div>
          <div
            css={css`
              grid-row: 3/4;
              font-size: 16px;
            `}
          >
            <ul
              css={css`
                display: flex;
              `}
            >
              <Link
                css={css`
                  text-decoration: none;
                  color: white;
                `}
              >
                <li
                  css={css`
                    display: block;
                    box-sizing: border-box;
                  `}
                >
                  Składy
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 10px;
          `}
        >
          <PlayersList team={homeTeam} />

          <PlayersList team={awayTeam} />
        </div>
      </div>
    );
  }

  
  export default MatchDetails;