import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  withStyles,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import RouteLink from '../common/RouteLink';
import axios from 'axios';
import { baseURL } from '../../app/config';

const styles = {
  paper: {
    textAlign: 'center',
  },
  textField: {
    marginBottom: 10,
  },
  cardActions: {
    justifyContent: 'space-between',
    padding: 16,
  }
};

const SignupPage = ({ classes, errors, isFetching, isSignUpSuccessful }) => {
  const [formInput, setFormInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleInput = (event) => {
    event.persist();
    setFormInput({
      ...formInput,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { data } = await axios.post(`${baseURL}/auth/signup`, formData);
    if (data) {
      console.log(data);
    }
  }

  return (
    <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
      <Backdrop open={isFetching || false} style={{ zIndex: 10 }}>
        <CircularProgress />
      </Backdrop>
      {isSignUpSuccessful ? <Redirect to="/login"/> : null}
      <Grid item xs sm={8} md={5} lg={4} xl={3}>
        <Card className={classes.paper}>
          <form onSubmit={handleSubmit}>
          <CardHeader
            title="Sign up"
            titleTypographyProps={{ color: 'primary', variant: 'h4' }}
            subheader="fill in your credentials"
          />
          <CardContent>
            <TextField
              required
              className={classes.textField}
              fullWidth
              name="first_name"
              variant="outlined"
              label="First name"
              value={formInput.firstname}
              onChange={handleInput}
            />
            <br />
            <TextField
              className={classes.textField}
              fullWidth
              name="last_name"
              variant="outlined"
              label="Last name"
              value={formInput.lastname}
              onChange={handleInput}
              />
            <TextField
              required
              error={Boolean(errors?.email)}
              helperText={errors?.email && errors?.email[0]}
              className={classes.textField}
              fullWidth
              name="email"
              variant="outlined"
              label="E-mail"
              value={formInput.email}
              onChange={handleInput}
              />
            <TextField
              required
              error={Boolean(errors?.password)}
              helperText={errors?.password && errors?.password[0]}
              className={classes.textField}
              fullWidth
              name="password"
              variant="outlined"
              label="Password"
              type="password"
              value={formInput.password}
              onChange={handleInput}
            />
            <TextField
              required
              error={Boolean(errors?.password_confirmation)}
              helperText={errors?.password_confirmation && errors?.password_confirmation[0]}
              className={classes.textField}
              fullWidth
              name="password_confirmation"
              variant="outlined"
              label="Confirm password"
              type="password"
              value={formInput.confirmation}
              onChange={handleInput}
              />
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Typography variant="subtitle2">
              Already registered?
              <RouteLink to="/login">&nbsp;Sign in</RouteLink>
            </Typography>
            <Button variant="contained" color="primary" type="submit">Sign up</Button>
          </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(SignupPage);