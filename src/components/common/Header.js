import React from 'react';
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
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../../app/UserContext';

function Header() {
  const history = useHistory();
  const { authHeader, setAuthHeader } = useUserContext();

  const handleLogout = () => {
    setAuthHeader(null);
    history.replace('/');
  }

  return (
    <AppBar>
      <Container maxWidth="md">
        <Toolbar>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <Typography variant="h3">/soc/net</Typography>
          </Link>
          {
            authHeader &&
            <Box marginLeft="auto" display="flex" alignItems="center">
              <IconButton size="small" onClick={() =>  history.push('/profiles')}>
                <Avatar />
              </IconButton>
              <IconButton
                style={{ color: 'white' }}
                onClick={handleLogout}
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