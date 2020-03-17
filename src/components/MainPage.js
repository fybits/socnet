import React, { useEffect } from 'react';
import { Grid, Paper, Drawer, List, ListItem } from '@material-ui/core';
import PostForm from './PostForm';
import { useSelector, useDispatch } from 'react-redux';
import Post from './Post';
import { FETCH_POSTS } from '../app/actions';

function MainPage() {
  const posts = useSelector((state) => state.posts)
    .slice(-10)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('[Fetching posts from useEffect]')
    dispatch({ type: FETCH_POSTS });
  }, [dispatch])

  return (
    <Grid
      justify="center"
      container style={{ marginTop: 70 }}
    >
      <Grid item xs sm={8} md={5} xl={4} >
        <PostForm />
        {
          posts.map(({ id, ...rest }) => (
            <Post key={id} {...rest}/>
          ))
        }
      </Grid>
    </Grid>
  );
}
  
export default MainPage;