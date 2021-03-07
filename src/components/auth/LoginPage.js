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
import RouteLink from '../common/RouteLink';
import { baseURL } from '../../app/config';
import axios from 'axios';
import { useUserContext } from '../../app/UserContext';

const styles = {
  paper: {
    textAlign: 'center'
  },
  textField: {
    marginBottom: 10
  },
  cardActions: {
    justifyContent: 'space-between',
    padding: 16
  }
};

const LoginPage = ({ classes, errors, isFetching, isSignUpSuccessful }) => {
  const [formInput, setFormInput] = useState({ email: '', password: '' })
  const { signIn } = useUserContext();

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
    signIn(formData);
  }

  return (
    <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
      <Backdrop open={isFetching || false} style={{ zIndex: 10 }}>
        <CircularProgress />
      </Backdrop>
      <Grid item xs sm={8} md={5} lg={4} xl={3}>
        <Card className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <CardHeader
              title="Sign in"
              titleTypographyProps={{ color: 'primary', variant: 'h4' }}
              subheader="enter your e-mail and password"
            />
            <CardContent>
              <TextField
                className={classes.textField}
                fullWidth
                name="email"
                variant="outlined"
                label="E-mail"
                value={formInput.email}
                onChange={handleInput}
              />
              <br />
              <TextField
                className={classes.textField}
                fullWidth
                name="password"
                variant="outlined"
                label="Password"
                type="password"
                value={formInput.password}
                onChange={handleInput}
              />
              {
                errors && (
                  <Typography variant="caption" color="error">{errors[0]}</Typography>
                )
              }
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Typography variant="subtitle2">
                Not registered yet?
                <RouteLink to="/signup">&nbsp;Sign up</RouteLink>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Log in
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(LoginPage);