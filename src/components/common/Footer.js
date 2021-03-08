import React from 'react';
import {
  Grid, withStyles,
} from '@material-ui/core';

const styles = (theme) => ({
    footer: {
        height: '20vh',
        marginTop: '150px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
    }
});

const Footer = ({ classes }) => {

  return (
    <Grid container justify="center" className={classes.footer} spacing={8}>
        <Grid item>
            Provided to you by @fyb1ts
        </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Footer);