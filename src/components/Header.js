import React from 'react';
import { AppBar, Toolbar, Typography, Container, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';
import { LOG_OUT } from '../app/actions';
import { Link } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();

  return (
    <AppBar>
      <Container maxWidth="md">
        <Toolbar>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <Typography variant="h3">/soc/net</Typography>
          </Link>
          <IconButton
            style={{ marginLeft: 'auto', color: 'white' }}
            onClick={() => dispatch({ type: LOG_OUT})}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
  
export default Header;