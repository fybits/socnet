import React, {  Component } from 'react';
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
import { SIGN_UP } from '../app/actions'
import { connect } from 'react-redux';
import RouteLink from './RouteLink';

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

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
  }

  handleInput = (event) => {
    event.persist();
    this.setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value.trim()
    }))
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    this.props.signup(formData);
  }

  render () {
    const { classes, errors, isFetching, isSignUpSuccessful } = this.props;

    return (
      <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
        <Backdrop open={isFetching || false} style={{ zIndex: 10 }}>
          <CircularProgress />
        </Backdrop>
        {isSignUpSuccessful ? <Redirect to="/login"/> : null}
        <Grid item xs sm={8} md={5} lg={4} xl={3}>
          <Card className={classes.paper}>
            <form onSubmit={this.handleSubmit}>
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
                name="first_  name"
                variant="outlined"
                label="First name"
                value={this.state.firstname}
                onChange={this.handleInput}
              />
              <br />
              <TextField
                className={classes.textField}
                fullWidth
                name="last_name"
                variant="outlined"
                label="Last name"
                value={this.state.lastname}
                onChange={this.handleInput}
                />
              <TextField
                required
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email[0]}
                className={classes.textField}
                fullWidth
                name="email"
                variant="outlined"
                label="E-mail"
                value={this.state.email}
                onChange={this.handleInput}
                />
              <TextField
                required
                error={Boolean(errors.password)}
                helperText={errors.password && errors.password[0]}
                className={classes.textField}
                fullWidth
                name="password"
                variant="outlined"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleInput}
              />
              <TextField
                required
                error={Boolean(errors.password_confirmation)}
                helperText={errors.password_confirmation && errors.password_confirmation[0]}
                className={classes.textField}
                fullWidth
                name="password_confirmation"
                variant="outlined"
                label="Confirm password"
                type="password"
                value={this.state.confirmation}
                onChange={this.handleInput}
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
}

const mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  isSignUpSuccessful: state.isSignUpSuccessful,
  errors: state.errors,
})

const mapDispatchToProps = (dispatch) => ({
  signup: (formData) => dispatch({type: SIGN_UP, payload: formData})
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignupPage));