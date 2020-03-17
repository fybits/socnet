import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import PostForm from './PostForm';
import { useSelector, useDispatch } from 'react-redux';
import Post from './Post';
import { FETCH_POSTS } from '../app/actions';

function MainPage() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('[Fetching posts from useEffect]')
    dispatch({ type: FETCH_POSTS });
  }, [])

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