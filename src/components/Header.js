import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';

function Header() {
  return (
    <AppBar>
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="h3">/soc/net</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
  
export default Header;