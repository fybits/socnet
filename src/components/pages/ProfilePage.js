import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Box, IconButton, Avatar } from '@material-ui/core';
import ScrollToTopFab from '../common/ScrollToTopFab';
import Post from '../posts/Post';
import { baseURL } from '../../app/config';
import axios from 'axios';
import { useUserContext } from '../../app/UserContext';

const ProfilePage = () => {
  const { userData: { id: currentUser }} = useUserContext();
  const { id = currentUser } = useParams();
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`${baseURL}/users/${id}`);
      if (data) {
        setUser(data);
      }
    }
    fetchUser();
  }, [id]);

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
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="body1">Posts: {user.posts?.length}</Typography>
          </Box>
        </Paper>
        <Paper>
          <Box padding={2}>
            <Typography variant="h5">Followers: {user.followers?.length}</Typography>
            {user.followers?.map((follower, index) => (
              <IconButton key={index} size="small" onClick={() =>  history.push(`/profiles/${follower.id}`)}>
                <Avatar />
              </IconButton>
            ))}
          </Box>
        </Paper>
        <Paper>
          <Box padding={2}>
            <Typography variant="h5">Following: {user.following?.length}</Typography>
            {user.following?.map((user, index) => (
              <IconButton key={index} size="small" onClick={() =>  history.push(`/profiles/${user.id}`)}>
                <Avatar />
              </IconButton>
            ))}
          </Box>
        </Paper>
        {user.posts?.map(({ id, ...rest }) => (
          <Post key={id} id={id} user={user} {...rest}/>
        ))}
      </Grid>
    </Grid>
  );
}

export default ProfilePage;