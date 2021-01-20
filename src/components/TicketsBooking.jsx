import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import StepperWithError from './StepperWithError';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import * as actions from "../actions/matches";
import { useAuth0 } from "@auth0/auth0-react";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px 10px 10px 20px",
  },
}));
const TicketsBooking = (props) => {

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getTicketsData = async () => {
      const domain = "dev-hjad2sh8.eu.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `http://localhost:62075/api`,
        });

        props.fetchAllMatches(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };

    getTicketsData();
  }, []); //componentDidMount
  const Id = props.match.params.id;
  const match = props.matchesList.find(x=>x.matchId == Id)
  console.log(match)
  const classes = useStyles();
  return (
    <div
      css={css`
        margin: 80px 0px 30px 0px;
        display: grid;
        grid-template-rows: 50px 1fr;
        width: 100vw;
        height: 100vh;
      `}
    >
      <div
        css={css`
          grid-row: 1/2;
          display: flex;
          justify-content: flex-start;
        `}
      >
        <Link to="/fixtures">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Back
          </Button>
        </Link>
      </div>
      <div
        css={css`
          grid-row: 2/3;
        `}
      >
        <StepperWithError match={match}/>
      </div>
    </div>
  );
};

 
const mapStateToProps = state => ({
  matchesList: state.matches.list
})

const mapActionToProps = {
  fetchAllMatches: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(TicketsBooking);