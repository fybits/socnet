import React, { useEffect, useState } from 'react';
import { baseURL } from '../app/config';
import Post from './Post';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ScrollToTopFab from './ScrollToTopFab';
import { Grid, Box } from '@material-ui/core';
import { LOAD_COMMENTS, FETCH_COMMENTS } from '../app/actions';
import CommentsBlock from './CommentsBlock';

function PostPage(props) {
  const { id } = useParams();

  const authHeaders = useSelector((state) => state.authHeaders);
  const comments = useSelector((state) => state.cachedComments.post[id]);
  const dispatch = useDispatch();

  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`${baseURL}/posts/${id}/`, { headers: authHeaders })
      .then((response) => response.json())
      .then((json) => { 
        setPost(json);
      }
    )
    dispatch({ type: FETCH_COMMENTS });
    dispatch({ type: LOAD_COMMENTS, payload: { id: Number(id), type: 'post' } });
  }, []);
  
  console.log('Comments', comments);
  return (
    <Grid
      justify="center"
      container style={{ marginTop: 70 }}
    >
      <ScrollToTopFab />
      <Grid item xs sm={8} md={5} xl={4} >
          <Post {...post}/>
          <CommentsBlock comments={comments}/>
      </Grid>
    </Grid>
  );
}

export default PostPage;