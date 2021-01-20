import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { create } from "../../actions/matches";
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


const MatchForm = (props) => {

   useEffect(() => {
     props.fetchAllTeams();
   }, []);
   const [redirect, setRedirect] = useState(null)
   const [errors, setErrors] = useState({});
   const [values, setValues] = useState({
    startDate: '2020-09-24T10:30',
    endDate: '2020-09-24T12:30',
    score: '',
    stadium: '',
    homeTeam: '',
    awayTeam: '',
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
          const match = {
            startDate: values.startDate,
            endDate: values.endDate,
            score: values.score,
            stadium: values.stadium,
            homeTeamId: props.teamsList.find(x=>x.name === values.homeTeam).teamId,
            awayTeamId: props.teamsList.find(x=>x.name === values.awayTeam).teamId,
          };
          const onSuccess = () => {
            console.log("success");
            window.confirm('Record has been added')
            setRedirect("/admin/matches")
          };
          if(match){
              props.createMatch(match, onSuccess);
          }

        }
      };

      const validate = () => {
        let temp = { ...errors };
        temp.stadium = /^[a-zA-Z]+$/.test(values.lastName)
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
                  <CardHeader subheader="Add new match" title="Add match" />
                  <Divider />
                  <CardContent>
                    <Grid direction="column" container spacing={3}>
                      <Grid item md={12} xs={6}>
                        <TextField
                          fullWidth
                          type="datetime-local"
                          label="StartDate"
                          name="startDate"
                          value={values.startDate}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={12} xs={6}>
                        <TextField
                          fullWidth
                          type="datetime-local"
                          label="EndDate"
                          name="endDate"
                          value={values.endDate}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={12} xs={6}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Score"
                          name="score"
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={12} xs={6}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Stadium"
                          name="stadium"
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={12} xs={6}>
                        <FormControl className={classes.formControl}>
                          <InputLabel className={classes.label} id="homeTeam">
                            Home Team
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="homeTeam"
                            label="homeTeam"
                            name="homeTeam"
                            onChange={handleChange}
                            variant="outlined"
                            value={values.homeTeam}
                          >
                            {props.teamsList.map((row) => {
                              return (
                                <MenuItem value={row.name}>{row.name}</MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={12} xs={6}>
                        <FormControl className={classes.formControl}>
                          <InputLabel className={classes.label} id="awayTeam">
                            Away Team
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="awayTeam"
                            label="awayTeam"
                            name="awayTeam"
                            onChange={handleChange}
                            variant="outlined"
                            value={values.awayTeam}
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
                    <Link to="/admin/matches">
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
    createMatch: create
  }
  
  export default connect(mapStateToProps, mapActionToProps)(MatchForm);