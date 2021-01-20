import React, { Component, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PlayersTable from './PlayersTable';
import { connect } from 'react-redux';
import * as actions from "../actions/players";

const Team = (props) => {
  useEffect(() => {
    props.fetchPlayersByTeam("Arsenal FC")
},[]) //componentDidMount
console.log(props.playersList)   
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
                <h2>Team</h2>
              </div>

              <PlayersTable rows={props.playersList} />
            </div>
        );
}
 
const mapStateToProps = state => ({
  playersList: state.players.list
})

const mapActionToProps = {
  fetchPlayersByTeam: actions.fetchByTeam
}

export default connect(mapStateToProps, mapActionToProps)(Team);