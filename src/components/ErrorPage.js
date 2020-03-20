import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';

function ErrorPage() {
  const history = useHistory();
  return (
    <Grid
      justify="center"
      container style={{ marginTop: 70 }}
    >
      <Grid item xs sm={8} md={5} xl={4} >
        <Typography variant="h1">{history.location.state.error}</Typography>
      </Grid>
    </Grid>
  )
}

export default ErrorPage;