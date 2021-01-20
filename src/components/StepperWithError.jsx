import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import * as actions from "../actions/tickets";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  instructions: {
    margin: "0px 0px 40px 20px"
  },
  card: {
      margin: "20px 20px 20px 20px",
  },
  navigation: {
      margin: "0px 0px 10px 20px",
  },
  form: {
    margin: "0px 20px 40px 0px",
  }
}));

const seats = [
  {
    value: "centreUpperBack",
    label: "Centre Upper Back",
  },
  {
    value: "nextToCentreUpper",
    label: "Next to Center Upper Back",
  },
  {
    value: "wingUpper",
    label: "Wing Upper",
  },
  {
    value: "wingUpperBack",
    label: "Wing Upper Back",
  },
  {
    value: "cornerUpper",
    label: "Corner Upper",
  },
  {
    value: "goalUpper",
    label: "Goal Upper",
  },
];

function getSteps() {
  return ['Seat selection', 'Personal data', 'Summary'];
}

const StepperWithError = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const { user, isAuthenticated } = useAuth0();
  const [errors, setErrors] = useState({});
  const { match } = props;
  const [values, setValues] = useState({
    seat: '',
    amount: 1,
    firstName: '',
    lastName: '',
    email: '',
  });
  const steps = getSteps();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(values);
      const ticket = {
        seat: values.seat,
        matchId: match.matchId,
        username: user.nickname,
        amount: values.amount,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        purchaseDate: new Date()
      };

      console.log(ticket);
      const onSuccess = () => {
        console.log("success");
      };
      if(ticket){
        console.log("TUTAJ")
        props.createTicket(ticket, onSuccess);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const validate = () => {
    let temp = { ...errors };
    temp.amount = /^\d+$/.test(values.amount)
      ? ""
      : "Inccorect value, please type a number";
    temp.firstName = /^[a-zA-Z]+$/.test(values.firstName)
      ? ""
      : "Incorrect value, first name should consist of letters only";
    temp.lastName = /^[a-zA-Z]+$/.test(values.lastName)
      ? ""
      : "Incorrect value, first name should consist of letters only";
    temp.email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      values.email
    )
      ? ""
      : "Incorrect email value";
      temp.amount = /^[1-9][0-9]?$|^100$/.test(values.amount)
      ? ""
      : "Incorrect value, amount should be at least 1";
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x == "");
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <form className={classes.form}>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  gap: 15px;
                `}
              >
                Nr of seats
                <TextField
                  name="amount"
                  value={values.amount}
                  fullWidth
                  type="number"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.amount}
                  helperText={errors.amount}
                />
                <TextField
                  fullWidth
                  label="Select Seat"
                  name="seat"
                  select
                  SelectProps={{ native: true }}
                  value={values.seat}
                  defaultValue="centreUpperBack"
                  variant="outlined"
                  onChange={handleChange}
                >
                  {seats.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>
            </form>
          </div>
        );
      case 1:
        return (
          <div>
            <form className={classes.form}>
              <div
                css={css`
                  display: grid;
                  gap: 15px;
                `}
              >
                <TextField
                  label="First name"
                  name="firstName"
                  fullWidth
                  type="text"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  value={values.firstName}
                  error={errors.firstName}
                  helperText={errors.firstName}
                />
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  type="text"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  value={values.lastName}
                  error={errors.lastName}
                  helperText={errors.lastName}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email}
                  helperText={errors.email}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="number"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  value={values.phonenumber}
                />
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div
            css={css`
              display: grid;
              gap: 15px;
              margin: 0px 0px 40px 20px;
            `}
          >
              <div>
                {match.homeTeam} vs{" "}
                {match.awayTeam}
              </div>
           
            <div>{values.firstName}</div>
            <div>{values.lastName}</div>
            <div>{values.email}</div>
            {values.amount && values.seat && (
              <div>
                {values.amount} x {values.seat}
              </div>
            )}
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                Thank you, your tickets have been booked.
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div className={classes.navigation}>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.button}
                  >
                    Finish
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}


const mapStateToProps = state => ({
  bookingsList: state.bookings.list
})

const mapActionToProps = {
  createTicket: actions.create
}

export default connect(mapStateToProps, mapActionToProps)(StepperWithError);