import React from 'react';
import { Container } from '@material-ui/core';
import PostForm from './PostForm';
import { useSelector } from 'react-redux';
import Post from './Post';

function MainPage() {
  const posts = useSelector((state) => state.posts);

  return (
    <Container style={{ marginTop: 70 }}>
      <PostForm />
      {
        posts.sort((a, b) => b.date - a.date)
        .map(({ id, ...rest }) => (
          <Post key={id} {...rest}/>
        ))
      }
    </Container>
  );
}
  
export default MainPage;