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

const useStyles = makeStyles(() => ({
  root: { margin: "20px 0px 80px 40px"},
  button: { width: "100%"},
  link: { textDecoration: "none", color: "#3f51b5"}
}));

const SignInForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({username: "", password: ""});
  const[errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    temp.username = values.username ? "" : "This field is required";
    temp.password = values.password ? "" : "This field is required";
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
        <CardHeader subheader="Login with your existing account" title="Log in" />
        <Divider />
        <CardContent>
          <Grid direction="column" container spacing={3}>
            <Grid item md={12} xs={6}>
              <TextField
                fullWidth
                type="text"
                label="Username or email"
                name="username"
                onChange={handleChange}
                required
                variant="outlined"
                value={values.username}
                error={errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid item md={12} xs={6}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                onChange={handleChange}
                required
                value={values.password}
                variant="outlined"
                error={errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="center" p={2}>
          <Button size="large" className={classes.button} type="submit" color="primary" variant="contained">
            Log in
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" p={2}>
          <Link
            className={classes.link}
            to="./register"
          >
            Don't have an account yet? Register now.
          </Link>
        </Box>
      </Card>
    </form>
  );
};

SignInForm.propTypes = {
  className: PropTypes.string
};

export default SignInForm;