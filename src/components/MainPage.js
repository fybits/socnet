import React from 'react';
import { Paper, Container } from '@material-ui/core';
import PostForm from './PostForm';

function MainPage() {
  
  return (
    <Container style={{ marginTop: 70 }}>
      <PostForm />
    </Container>
  );
}
  
export default MainPage;