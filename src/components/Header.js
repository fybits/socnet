import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Avatar,
  Box,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT } from '../app/actions';
import { Link, useHistory } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const authHeaders = useSelector((state) => state.authHeaders);

  return (
    <AppBar>
      <Container maxWidth="md">
        <Toolbar>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <Typography variant="h3">/soc/net</Typography>
          </Link>
          {
            authHeaders &&
            <Box marginLeft="auto" display="flex" alignItems="center">
              <Avatar onClick={() => {
                history.push('/profiles');
              }
              }/>
              <IconButton
                style={{ color: 'white' }}
                onClick={() => dispatch({ type: LOG_OUT})}
              >
                <ExitToAppIcon />
              </IconButton>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
  
export default Header;