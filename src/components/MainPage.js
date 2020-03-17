import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
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
  }, [dispatch])

  return (
    <Grid
      direction="column"
      alignItems="center"
      container style={{ marginTop: 70 }}
    >
      <Grid item xs sm={8} md={5} xl={4} >
        <PostForm />
        {
          posts.sort((a, b) => b.date - a.date)
          .map(({ id, ...rest }) => (
            <Post key={id} {...rest}/>
          ))
        }
      </Grid>
    </Grid>
  );
}
  
export default MainPage;