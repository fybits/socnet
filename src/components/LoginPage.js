import React, { Component } from 'react';
import { TextField, Grid, Typography, Button, Link, Card, CardActions, CardContent, CardHeader, withStyles } from '@material-ui/core';
import { Link as RouteLink } from 'react-router-dom';
import { SIGN_IN } from '../app/actions';
import { connect } from 'react-redux';

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

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValidEmail: false,
      isValid: false,
    }
    console.log(this.props.signup)
  }
  

  validate = () => {
    this.setState((prevState) => {
      let isValidEmail = /\S+@\S+\.\S+/g.test(prevState.email);
      let isValid = isValidEmail &&
                    Boolean(prevState.password);
      return {
        ...prevState,
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
        <Grid item xs sm={8} md={5} lg={4} xl={3}>
          <Card className={classes.paper}>
            <CardHeader
              title="Sign in"
              titleTypographyProps={{ color: 'primary', variant: 'h4' }}
              subheader="enter your e-mail and password"
            />
            <CardContent>
              <TextField
                className={classes.textField}
                error={!this.state.isValidEmail}
                helperText={!this.state.isValidEmail && "Not valid e-mail address"}
                fullWidth
                name="email"
                variant="outlined"
                label="E-mail"
                value={this.state.email}
                onChange={this.handleInput}
              />
              <br />
              <TextField
                className={classes.textField}
                fullWidth
                name="password"
                variant="outlined"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleInput}
              />
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Typography variant="subtitle2">
                Not registered yet?
                <Link
                  href="#"
                  component=
                  {
                    React.forwardRef((props, ref) => {
                      return <RouteLink to="/signup" ref={ref} {...props}/>
                    })
                  }
                  >
                  &nbsp;Sign up
                </Link>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disabled={!this.state.isValid}
                onClick={() => this.props.signin(this.state)}
              >
                Log in
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  signin: ({ email, password, ...rest }) => dispatch({type: SIGN_IN, payload: { email, password }})
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(LoginPage));