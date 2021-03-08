import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, Link } from '@material-ui/core';

const ErrorPage = ({ error }) => {
  const history = useHistory();
  return (
    <Grid
      justify="center"
      container style={{ marginTop: 70 }}
    >
      <Grid item xs sm={10} md={6} lg={4}>
        <Typography variant="h1">{error || history.location.state || 'Unknown error'}</Typography>
        <Link href="#" onClick={() => history.goBack()}>go back</Link>
      </Grid>
    </Grid>
  )
}

export default ErrorPage;