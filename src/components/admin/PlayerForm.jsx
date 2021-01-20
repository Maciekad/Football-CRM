import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { create } from "../../actions/players";
import { fetchAll } from "../../actions/teams";
import { makeStyles, Paper, TextField, Button, Box, Divider,
     Grid, Card, CardHeader, CardContent, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';

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


const PlayerForm = (props) => {

   useEffect(() => {
     props.fetchAllTeams();
   }, []);
   
   const [redirect, setRedirect] = useState(null)
   const [errors, setErrors] = useState({});
   const [values, setValues] = useState({
    number: 1,
    firstName: '',
    lastName: '',
    position: '',
    team: '',
  });
  const positions = ['GK','CB','LB','RB', 'DM', 'CM', 'LW', 'RW', 'CF']
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
          const player = {
            number: parseInt(values.number),
            firstName: values.firstName,
            lastName: values.lastName,
            position: values.position,
            teamId: props.teamsList.find(x=>x.name === values.team).teamId,
          };
          const onSuccess = () => {
            console.log("success");
            window.confirm('Record has been added')
            setRedirect("/admin/players")
          };
          console.log(player)
          if(player){
              props.createPlayer(player, onSuccess);
          }

        }
      };

      const validate = () => {
        let temp = { ...errors };
        temp.firstName = /^[a-zA-Z]+$/.test(values.firstName)
          ? ""
          : "Incorrect value, first name should consist of letters only"; 
          temp.numbber = /^\d+$/.test(values.number)
          ? ""
          : "Incorrect value, number should be number";         
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
                  <CardHeader subheader="Add new player" title="Add player" />
                  <Divider />
                  <CardContent>
                    <Grid direction="column" container spacing={3}>
                      <Grid item md={12} xs={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Number"
                          name="number"
                          onChange={handleChange}
                          required
                          variant="outlined"
                          value={values.number}
                        />
                      </Grid>
                      <Grid item md={12} xs={6}>
                        <TextField
                          fullWidth
                          type="text"
                          label="First Name"
                          name="firstName"
                          onChange={handleChange}
                          required
                          variant="outlined"
                          value={values.firstName}
                        />
                      </Grid>
                      <Grid item md={12} xs={6}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Last Name"
                          name="lastName"
                          onChange={handleChange}
                          required
                          variant="outlined"
                          value={values.lastName}
                        />
                      </Grid>
                      <Grid item md={12} xs={6}>
                        <FormControl className={classes.formControl}>
                          <InputLabel className={classes.label} id="position">
                            Position
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="position"
                            label="Position"
                            name="position"
                            onChange={handleChange}
                            variant="outlined"
                            value={values.position}
                          >
                            {positions.map((pos) => {
                              return <MenuItem value={pos}>{pos}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={12} xs={6}>
                        <FormControl className={classes.formControl}>
                          <InputLabel className={classes.label} id="homeTeam">
                            Team
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="team"
                            label="Team"
                            name="team"
                            onChange={handleChange}
                            variant="outlined"
                            value={values.team}
                          >
                            {props.teamsList.map((row) => {
                              return (
                                <MenuItem value={row.name}>{row.name}</MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <Box display="flex" justifyContent="flex-end" p={2}>
                    <Link to="/admin/players">
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
    fetchAllTeams: fetchAll,
    createPlayer: create
  }
  
  export default connect(mapStateToProps, mapActionToProps)(PlayerForm);