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
import UserAvatar from './UserAvatar';

function Header() {
  const history = useHistory();
  const { logout, authHeader, userData } = useUserContext();

  return (
    <AppBar>
      <Container maxWidth="md">
        <Toolbar>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <Typography variant="h3">thoughts</Typography>
          </Link>
          {
            authHeader &&
            <Box marginLeft="auto" display="flex" alignItems="center">
              <UserAvatar userId={userData.id} onClick={() => history.push('/profiles')} />
              <IconButton
                style={{ color: 'white' }}
                onClick={logout}
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