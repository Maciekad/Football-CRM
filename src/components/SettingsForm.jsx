import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
  root: { margin: "20px 0px 80px 40px"}
}));

const SettingsForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({oldpassword: "", newpassword: "",  newpassword2: ""});
  const[errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    temp.oldpassword = values.oldpassword ? "" : "This field is required";
    temp.newpassword = values.newpassword ? "" : "This field is required";
    temp.newpassword2 = values.newpassword2 ? "" : "This field is required";
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
        <CardHeader subheader="The information can be edited" title="Change password" />
        <Divider />
        <CardContent>
          <Grid direction="column" container spacing={3}>
            <Grid item md={6} xs={6}>
              <TextField
                fullWidth
                type="password"
                label="Old password"
                name="oldpassword"
                onChange={handleChange}
                required
                variant="outlined"
                value={values.oldpassword}
                error={errors.oldpassword}
                helperText={errors.oldpassword}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                fullWidth
                type="password"
                label="New password"
                name="newpassword"
                onChange={handleChange}
                required
                value={values.newpassword}
                variant="outlined"
                error={errors.newpassword}
                helperText={errors.newpassword}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                fullWidth
                type="password"
                label="Repeat password"
                name="newpassword2"
                onChange={handleChange}
                required
                value={values.newpassword2}
                variant="outlined"
                error={errors.newpassword2}
                helperText={errors.newpassword2}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-start" p={3}>
          <Button type="submit" color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

SettingsForm.propTypes = {
  className: PropTypes.string
};

export default SettingsForm;