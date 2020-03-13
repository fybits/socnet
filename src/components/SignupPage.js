import React, {  Component } from 'react';
import { TextField, Grid, Typography, Button, Link, Card, CardActions, CardContent, CardHeader, withStyles } from '@material-ui/core';
import { Link as RouteLink } from 'react-router-dom';
import { SIGN_UP } from '../app/actions'
import { connect } from 'react-redux';

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
      firstname: '',
      surname: '',
      email: '',
      password: '',
      confirmation: '',
      isPasswordsMatching: true,
      isPasswordSafe: false,
      isValidEmail: false,
      isValid: false,
    }
    console.log(this.props.signup)
  }
  

  validate = () => {
    this.setState((prevState) => {
      let isPasswordsMatching = prevState.password === prevState.confirmation;
      let isPasswordSafe = (prevState.password.length >= 8 && /[a-zA-Z]/g.test(prevState.password));
      let isValidEmail = /\S+@\S+\.\S+/g.test(prevState.email);
      let isValid = isPasswordSafe &&
                    isPasswordsMatching &&
                    isValidEmail &&
                    Boolean(prevState.firstname) &&
                    Boolean(prevState.surname);
      return {
        ...prevState,
        isPasswordsMatching,
        isPasswordSafe,
        isValidEmail,
        isValid,
      }
    })
  }

  handleInput = (event) => {
    event.persist();
    this.setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value.trim()
    }))
    this.validate();
  }
  
  render () {
    const { classes } = this.props;

    return (
      <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item md={6}>
          <Card className={classes.paper}>
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
                name="firstname"
                variant="outlined"
                label="First name"
                value={this.state.firstname}
                onChange={this.handleInput}
              />
              <br />
              <TextField
                required
                className={classes.textField}
                fullWidth
                name="surname"
                variant="outlined"
                label="Surname"
                value={this.state.surname}
                onChange={this.handleInput}
              />
              <TextField
                required
                error={!this.state.isValidEmail}
                helperText={!this.state.isValidEmail && "Not valid e-mail address"}
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
                error={!this.state.isPasswordSafe}
                helperText={!this.state.isPasswordSafe && "Password must be at least 8 characters long and contain letters"}
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
                error={!this.state.isPasswordsMatching}
                helperText={!this.state.isPasswordsMatching && "Passwords don't match"}
                className={classes.textField}
                fullWidth
                name="confirmation"
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
                <Link
                  href="#"
                  component=
                  {
                    React.forwardRef((props, ref) => {
                      return <RouteLink to="/login" ref={ref} {...props}/>
                    })
                  }
                  >
                  &nbsp;Sign in
                </Link>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disabled={!this.state.isValid}
                onClick={() => this.props.signup(this.state)}
              >
                Sign up
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signup: ({ firstname, surname, email, password, ...rest }) => dispatch({type: SIGN_UP, payload: { firstname, surname, email, password }})
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(SignupPage));