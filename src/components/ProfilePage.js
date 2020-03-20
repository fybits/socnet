import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import ScrollToTopFab from './ScrollToTopFab';
import Post from './Post';
import { FETCH_POSTS } from '../app/actions';

function ProfilePage() {
  const { id } = useParams();
  const myId = useSelector((state) => state.userData.id);
  let user_id = id || myId;
  
  const posts = useSelector((state) => state.posts)
    .filter((post) => post.user_id === +user_id);
  posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const dispatch = useDispatch();
  console.log({user_id, id, myId, posts});
  useEffect(() => {
    console.log('[Fetching posts from useEffect]')
    dispatch({ type: FETCH_POSTS });
  }, [])

  return (
    <Grid
      justify="center"
      container style={{ marginTop: 70 }}
    >
      <ScrollToTopFab />
      <Grid item xs sm={8} md={5} xl={4} >
        {
          posts.map(({ id, ...rest }) => (
            <Post key={id} id={id} {...rest}/>
          ))
        }
      </Grid>
    </Grid>
  );
}

export default ProfilePage;