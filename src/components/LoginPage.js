import React, { Component } from 'react';
import {
  TextField,
  Grid,
  Typography,
  Button,
  Link,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  withStyles,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
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
    this.props.signin(formData);
  }

  render () {
    const { classes, errors, isFetching, isSignUpSuccessful } = this.props;
    return (
      <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
        <Backdrop open={isFetching || false} style={{ zIndex: 10 }}>
          <CircularProgress />
        </Backdrop>
        <Grid item xs sm={8} md={5} lg={4} xl={3}>
          <Card className={classes.paper}>
            <form onSubmit={this.handleSubmit}>
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
                {
                  errors && (
                    isSignUpSuccessful
                    ?
                    <Typography variant="caption" style={{ color: '#007E33' }}>{errors[0]}</Typography>
                    :
                    <Typography variant="caption" color="error">{errors[0]}</Typography>
                  )
                }
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
}

const mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  isSignUpSuccessful: state.isSignUpSuccessful,
  errors: state.errors,
})

const mapDispatchToProps = (dispatch) => ({
  signin: (formData) => dispatch({type: SIGN_IN, payload: formData})
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));