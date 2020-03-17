import React from 'react';
import { useScrollTrigger, makeStyles, Fab, Slide } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  }
});

function ScrollToTopFab() {
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 500,
  });
  const classes = useStyles();

  return (
    <Slide direction="up" in={scrollTrigger}>
      <Fab className={classes.fab} onClick={() => window.scroll({ top: 0 })}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Slide>
  )
}

export default ScrollToTopFab;