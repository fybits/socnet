import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, Link } from '@material-ui/core';

function ErrorPage(props) {
  const history = useHistory();
  return (
    <Grid
      justify="center"
      container style={{ marginTop: 70 }}
    >
      <Grid item xs sm={8} md={5} xl={4} >
        <Typography variant="h1">{props.error || history.location.state || 'Unknown error'}</Typography>
        <Link href="#" onClick={() => history.goBack()}>go back</Link>
      </Grid>
    </Grid>
  )
}

export default ErrorPage;