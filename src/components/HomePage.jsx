import React, { Component, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Inject ,ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';
import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
import UpcomingMatch from './UpcomingMatch';
import { connect } from 'react-redux';
import * as actions from "../actions/matches";

const HomePage = (props) => {
  useEffect(() => {
    props.fetchAllMatches()
},[]) //componentDidMount
console.log(props.matchesList)
    return (
      <div
        css={css`
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 60px 300px 1fr;
          background-color: white;
          gap: 10px;
          margin-left: 20px;
        `}
      >
        <div
          css={css`
            border-bottom: 1px solid #d3d3d3;
            display: flex;
          `}
        >
          <h2>Najbliższe mecze</h2>
        </div>
        <div
          css={css`
            border-bottom: 1px solid #d3d3d3;
            display: flex;
          `}
        >
          <h2>Kalendarz</h2>
        </div>

        {props.matchesList
          .filter((x) => x.date > new Date(Date.now()).toJSON())
          .sort((a, b) => a.date - b.date)
          .map((value) => {
            return <UpcomingMatch match={value} />;
          })}

        <ScheduleComponent
          height="450px"
          css={css`
            grid-row: 2/3;
            grid-column: 2/3;
            margin: 10px 0px 50px 0px;
          `}
          selectedDate={Date.now()}
          eventSettings={{
            dataSource: props.matchesList.map(
              (x) =>
                (x = {
                  Id: x.Id,
                  Subject:
                    "" +
                    x.homeTeam +
                    " vs " +
                    x.awayTeam,
                  StartTime: x.date,
                  EndTime: x.endDate,
                  IsAllDay: false,
                })
            ),
          }}
          currentView="Month"
          readonly={true}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    );
  }

const mapStateToProps = state => ({
  matchesList: state.matches.list,
  
})

const mapActionToProps = {
  fetchAllMatches: actions.fetchAll,
}

export default connect(mapStateToProps, mapActionToProps)(HomePage);