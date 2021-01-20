import React, { Component, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PlayedMatch from './PlayedMatch';
import { connect } from 'react-redux';
import * as actions from "../actions/matches";

const Matches = (props) => {
  useEffect(() => {
    props.fetchAllMatches()
},[]) //componentDidMount
console.log(props.teamsList);
    return (
      <div
        css={css`
          display: grid;
          grid-template-rows: 60px 1fr;
          margin: 10px 20px 50px 20px;
          width: 100%;
        `}
      >
        <div
          css={css`
            grid-row: 1/2;
            display: flex;
            border-bottom: 1px solid #d3d3d3;
          `}
        >
          <h2>Results</h2>
        </div>

        {props.matchesList.map((value) => {
          return (
            <div>
              <PlayedMatch match={value} />
            </div>
          );
        })}
      </div>
    );
}

const mapStateToProps = state => ({
  matchesList: state.matches.list.filter(x=>x.date < new Date(Date.now()).toJSON()),
})

const mapActionToProps = {
  fetchAllMatches: actions.fetchAll,
}

export default connect(mapStateToProps, mapActionToProps)(Matches);