import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { create } from "../../actions/teams";
import { makeStyles, Paper, TextField, Button, Box, Divider,
     Grid, Card, CardHeader, CardContent} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 100,
    marginRight: 50,
    marginLeft: 50,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  button: {
      marginLeft: 10,
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginLeft: 10
  },
}));


const TeamForm = (props) => {
   const [redirect, setRedirect] = useState(null);
   const [errors, setErrors] = useState({});
   const [values, setValues] = useState({
    name: '',
    manager: '',
  });
    const classes = useStyles();

    const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });

        console.log(event.target.value)
      };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
          const team = {
            name: values.name,
            manager: values.manager,          
          };
          const onSuccess = () => {
            console.log("success");
            window.confirm('Record has been added')
            setRedirect("/admin/teams")
          };
          if(team){
              props.createTeam(team, onSuccess);
          }

        }
      };

      const validate = () => {
        let temp = { ...errors };
        temp.name = /^[a-zA-Z]+$/.test(values.firstName)
          ? ""
          : "Incorrect value, first name should consist of letters only";       
        setErrors({
          ...temp,
        });
    
        return Object.values(temp).every((x) => x == "");
      };
    
      if (redirect) {
        return <Redirect to={redirect} />;
      } else
        return (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <form autoComplete="off">
                <Card>
                  <CardHeader subheader="Add new team" title="Add team" />
                  <Divider />
                  <CardContent>
                    <Grid direction="column" container spacing={3}>
                      <Grid item md={12} xs={6}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Name"
                          name="name"
                          onChange={handleChange}
                          required
                          variant="outlined"
                          value={values.name}
                        />
                      </Grid>
                      <Grid item md={12} xs={6}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Manager"
                          name="manager"
                          onChange={handleChange}
                          required
                          variant="outlined"
                          value={values.manager}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <Box display="flex" justifyContent="flex-end" p={2}>
                    <Link to="/admin/teams">
                      <Button
                        size="large"
                        className={classes.button}
                        type="submit"
                        color="primary"
                        variant="contained"
                      >
                        Back
                      </Button>
                    </Link>
                    <Button
                      size="large"
                      className={classes.button}
                      type="submit"
                      color="primary"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Box>
                </Card>
              </form>
            </Paper>
          </div>
        );
}

const mapStateToProps = state => ({
    teamsList: state.teams.list
   })

  const mapActionToProps = {
    createTeam: create
  }
  
  export default connect(mapStateToProps, mapActionToProps)(TeamForm);