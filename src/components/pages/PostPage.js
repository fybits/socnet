import React, { useEffect, useState } from 'react';
import { baseURL } from '../../app/config';
import Post from '../posts/Post';
import { useParams, useHistory } from 'react-router-dom';
import ScrollToTopFab from '../common/ScrollToTopFab';
import { Grid, Box, CircularProgress } from '@material-ui/core';
import CommentsBlock from '../comments/CommentsBlock';
import axios from 'axios';

const PostPage = () => {
  const { id } = useParams();

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}/posts/${id}`);
      if (data) {
        setPost(data);
        console.log(data)
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  return (
    <Grid
      justify="center"
      container style={{ marginTop: 70, marginBottom: '50vh'}}
    >
      <ScrollToTopFab />
      <Grid item xs sm={10} md={6} lg={4}>
          {
            loading || !post.id
            ?
            <Box display="flex" marginTop={2} justifyContent="center">
              <CircularProgress  />
            </Box>
            :
            <>
            <Post {...post}/>
            <CommentsBlock id={id} type="post"/>
            </>
          }
      </Grid>
    </Grid>
  );
}

export default PostPage;