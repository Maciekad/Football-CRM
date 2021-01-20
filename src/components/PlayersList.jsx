import React, { Component, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from "react-redux";
import * as actions from "../actions/players";

const PlayersList = (props) => {
  useEffect(() => {
    props.fetchAllPlayers()
  }, []);
    
    const playersList = props.playersList.filter(x=>x.team === props.team)  
    console.log(playersList)


  const renderListData = () => {
    return playersList.map((player, index) => {
      const { playerId, number, firstName, lastName } = player;
      return (
        <div
          key={playerId}
          css={css`
            display: flex;
            padding-left: 20px;
            padding-top: 8px;
            :hover {
              background-color: #f6f6f6;
              cursor: pointer;
            }
          `}
        >
          <div
            css={css`
              display: flex;
              margin-bottom: 9px;
              font-weight: bold;
            `}
          >
            <div
              css={css`
                width: 25px;
              `}
            >
              {number}
            </div>
            <div
              css={css`
                margin-right: 4px;
              `}
            >
              {firstName}
            </div>
            <div>{lastName}</div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div
        css={css`
          color: white;
          background-color: #10182e;
          padding: 16px;
          font-size: 13px;
          border-top: solid 3px dodgerblue;
        `}
      />
      <div
        css={css`
          background-color: #f8f7f6;
          font-size: 14px;
        `}
      >
        {renderListData()}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  playersList: state.players.list,
})

const mapActionToProps = {
  fetchAllPlayers: actions.fetchAll,
}

export default connect(mapStateToProps, mapActionToProps)(PlayersList);