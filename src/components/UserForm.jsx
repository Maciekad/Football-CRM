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

const UserForm = (props, { className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState(props.user);
  const[errors, setErrors] = useState({});



  const validate = () => {
    let temp = {...errors};
    temp.firstName = (/^[a-zA-Z\s]*$/).test(values.name) ? "" : "Incorrect value, first name should consist of letters only";
    temp.nickname = (/^(?!\s*$).+/).test(values.nickname) ? "" : "Incorrect value, nickname can't be empty";
    temp.email = (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(values.email) ? "" : "Incorrect email value";
    setErrors({
      ...temp,
    });

    console.log(temp)

    return Object.values(temp).every(x => x == "")
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    console.log(validate())
    event.preventDefault();
    if(validate()){
        console.log(values)
        var axios = require("axios").default;
        const userId = values.sub;


    var options = {
      method: "PATCH",
      url: "https://dev-hjad2sh8.eu.auth0.com/api/v2/users/" + userId,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFvVVJudzdqeXdiejFGVmNBa1ZoMSJ9.eyJpc3MiOiJodHRwczovL2Rldi1oamFkMnNoOC5ldS5hdXRoMC5jb20vIiwic3ViIjoiWEFHeUxidmwweDlVNmZ1eGw4U3ZvcEI3UzcyZ0FZZlVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWhqYWQyc2g4LmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjA1ODk1OTQyLCJleHAiOjE2MDU5ODIzNDIsImF6cCI6IlhBR3lMYnZsMHg5VTZmdXhsOFN2b3BCN1M3MmdBWWZVIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.BZdW3sXdRR-GeMpgfGBPOomn0jF0kYVBwvyex37ARc45CCb2-FvcAEixKvHBi5COCq7lKQvq2D5-5sC-X_sIXU4rvK1-sotO4XPytWOdobzpO1cpwmO38m8dI8m_xEGlMQU2Y8ywqc4ydiRi_EosgVb-wpBFcBtkAeDRE89G1uM6Rlaq4wxqy9dT_XMtAe5JGoI-ZxHSHrTXfDi1YeXFpRVhggHcG6zUBSWhgnxIwOrMZChX5SPX-fIAoPG3VSPGh8axF9P9ARyl7lGdRlj6y9yEVu5VpYizWb0_ftBWSr9KJZY_5a2Jfw6JojdNpeDxA6FZ2XLqhj1tYWkkAcbM9A",
          "content-type": "application/json",
      },
      data: {
        user_metadata: {
          name: values.name,
          nickname: values.nickname,
          email: values.email,
        },
      },
    };

  axios
  .request(options)
  .then(function (response) {
    console.log(JSON.parse(response.config.data).user_metadata)
    const user = JSON.parse(response.config.data).user_metadata;
    setValues(user)
  
  })
  .catch(function (error) {
    console.error(error);
  });
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
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
                error={errors.name}
                helperText={errors.name}
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
                label="Nickname"
                name="nickname"
                onChange={handleChange}
                type="text"
                value={values.nickname}
                variant="outlined"
                error={errors.nickname}
                helperText={errors.nickname}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button type="submit" color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

UserForm.propTypes = {
  className: PropTypes.string
};

export default UserForm;