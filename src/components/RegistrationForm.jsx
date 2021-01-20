import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const states = [
  {
    value: "mazowieckie",
    label: "Mazowieckie",
  },
  {
    value: "wielkopolskie",
    label: "Wielkopolskie",
  },
  {
    value: "małopolskie",
    label: "Małopolskie",
  },
];

const useStyles = makeStyles(() => ({
  root: { margin: "20px 0px 80px 40px"},
  button: { width: "100%"},
  link: { textDecoration: "none", color: "#3f51b5"}
}));

const RegistrationForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({firstName: "", lastName: "", email: "", phone:"", country:""});
  const[errors, setErrors] = useState({});

  const validate = () => {
    let temp = {...errors};
    temp.firstName = (/^[a-zA-Z]+$/).test(values.firstName) ? "" : "Incorrect value, first name should consist of letters only";
    temp.lastName = (/^[a-zA-Z]+$/).test(values.lastName) ? "" : "Incorrect value, last name should consist of letters only";
    temp.email = (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(values.email) ? "" : "Incorrect email value";
    temp.phone = values.phone.length == 9 ? "" : "Phone number should consist of 9 numbers";
    temp.country = (/^[a-zA-Z]+$/).test(values.country) ? "" : "Incorrect country value";
    setErrors({
      ...temp
    })


    return Object.values(temp).every(x => x == "")
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validate()){
        
    }
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader subheader="Create an account quickly and easily." title="Register" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
                error={errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
                error={errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
                error={errors.email}
                helperText={errors.email}

              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
                error={errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
                error={errors.country}
                helperText={errors.country}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="center" p={2}>
          <Button size="large" className={classes.button} type="submit" color="primary" variant="contained">
            Register
          </Button>
        </Box>
      </Card>
    </form>
  );
};

RegistrationForm.propTypes = {
  className: PropTypes.string
};

export default RegistrationForm;