import React, { useEffect, useState } from 'react';
import { baseURL } from '../app/config';
import Post from './Post';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ScrollToTopFab from './ScrollToTopFab';
import { Grid, Box, CircularProgress } from '@material-ui/core';
import { FETCH_COMMENTS } from '../app/actions';
import CommentsBlock from './CommentsBlock';

function PostPage() {
  const { id } = useParams();

  const isFetching = useSelector((state) => state.isFetching);
  const authHeaders = useSelector((state) => state.authHeaders);
  const dispatch = useDispatch();
  
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`${baseURL}/posts/${id}/`, { headers: authHeaders })
      .then((response) => response.json())
      .then((json) => { 
        setPost(json);
      }
    )
    dispatch({ type: FETCH_COMMENTS , payload: { background: false } })
    const interval = setInterval(() => (
      dispatch({ type: FETCH_COMMENTS , payload: { background: true } })
    ), 15000);
    return () => {
      clearInterval(interval);
    }
  }, []);
  
  return (
    <Grid
      justify="center"
      container style={{ marginTop: 70, marginBottom: '50vh'}}
    >
      <ScrollToTopFab />
      <Grid item xs sm={8} md={5} xl={4}>
          <Post {...post}/>
          {
            isFetching
            ?
            <Box display="flex" marginTop={2} justifyContent="center">
              <CircularProgress  />
            </Box>
            :
            <CommentsBlock id={id} type="post"/>
          }
      </Grid>
    </Grid>
  );
}

export default PostPage;