import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Paper, Typography, Box } from '@material-ui/core';
import ScrollToTopFab from './ScrollToTopFab';
import Post from './Post';
import { FETCH_POSTS } from '../app/actions';

function ProfilePage() {
  const { id } = useParams();
  const userData = useSelector((state) => state.userData);
  const authUser = !id;
  let user_id = id || userData.id;

  const posts = useSelector((state) => state.posts)
    .filter((post) => post.user_id === +user_id);
  posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_POSTS });
    // eslint-disable-next-line
  }, [])

  return (
    <Grid
      justify="center"
      container style={{ marginTop: 70 }}
    >
      <ScrollToTopFab />
      <Grid item xs sm={8} md={5} xl={4} >
        <Paper>
          <Box padding={2}>
            <Typography variant="h3">
              User ID: {user_id}
            </Typography>
            <Typography variant="body1">
              {
                authUser &&
                <React.Fragment>
                  First name: {userData.first_name}<br />
                  Last name: {userData.last_name}<br />
                  E-mail: {userData.email}<br />
                </React.Fragment>
              }
              Posts: {posts.length}
            </Typography>
          </Box>
        </Paper>
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