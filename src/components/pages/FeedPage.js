import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import PostForm from '../posts/PostForm';
import Post from '../posts/Post';
import ScrollToTopFab from '../common/ScrollToTopFab';
import axios from 'axios';
import { baseURL } from '../../app/config';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const { data } = await axios.get(`${baseURL}/posts/`);
      console.log(data);
      setPosts(data);
    }
    fetchFeed();
  }, []);

  return (
    <Grid
      justify="center"
      container style={{ marginTop: 70 }}
    >
      <ScrollToTopFab />
      <Grid item xs sm={10} md={6} lg={4}>
        <PostForm />
        {
          posts.map(({ id, ...rest }) => (
            <Post key={id} id={id} {...rest}/>
          ))
        }
      </Grid>
    </Grid>
  );
}

export default FeedPage;