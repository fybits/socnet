import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';
import { Grid, Paper, Typography, Box, IconButton, Avatar, Modal, Card, CardHeader, CardContent, withStyles, Button } from '@material-ui/core';
import ScrollToTopFab from '../common/ScrollToTopFab';
import Post from '../posts/Post';
import { baseURL } from '../../app/config';
import axios from 'axios';
import _ from 'lodash';
import { useUserContext } from '../../app/UserContext';
import UserListModal from '../common/UserListModal';
import UserAvatar from '../common/UserAvatar';

const options = {
  followers: {
    title: 'Followers',
    key: 'followers',
  },
  following: {
    title: 'Following',
    key: 'following',
  },
};

const ProfilePage = () => {
  const { userData: { id: currentUser }} = useUserContext();
  const { id = currentUser } = useParams();
  const [user, setUser] = useState({});
  const history = useHistory();
  const [userList, setUserList] = useState(null);
  const [reload, setReload] = useState(null);

  const isFollowed = !!user?.followers?.find((follower) => follower.id === currentUser);

  const handleFollow = async () => {
    const { data } = await axios.post(`${baseURL}/users/follow/${id}`);
    setReload(data)
  }

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`${baseURL}/users/${id}`);
      if (data) {
        setUser(data);
      }
    }
    setUserList(null);
    fetchUser();
  }, [id, reload]);

  return (
    <Grid
      justify="center"
      container style={{ marginTop: 70 }}
    >
      <ScrollToTopFab />
      <Grid item xs sm={10} md={6} lg={4}>
        <Paper>
          <Grid container style={{ padding: '16px' }} direction="column">
            <Grid container item direction="row">
              <img height="100px" src={`https://i.pravatar.cc/150?u=${user.id}`} alt="avatar"></img>
              <Typography variant="h3" style={{ marginLeft: '20px' }}>
                {user.first_name} {user.last_name}
              </Typography>
            </Grid>
            <Typography variant="body1">Posts: {user.posts?.length}</Typography>
            {currentUser !== id && (
              <Button
                onClick={handleFollow}
                variant="contained"
                color={isFollowed ? 'default' : 'primary'}
              >
                {isFollowed ? 'Followed' : 'Follow'}
              </Button>
            )}
          </Grid>
        </Paper>
        <Paper>
          <Box padding={2}>
            <Typography variant="h5">Followers: {user.followers?.length}</Typography>
            {_.take(user.followers, 5)?.map((follower, index) => (
              <UserAvatar key={index} userId={follower.id} onClick={() =>  history.push(`/profiles/${follower.id}`)} />
            ))}
            <IconButton onClick={() => setUserList(options.followers)}>
              <ListIcon />
            </IconButton>
          </Box>
        </Paper>
        <Paper>
          <Box padding={2}>
            <Typography variant="h5">Following: {user.following?.length}</Typography>
            {_.take(user.following, 5)?.map((user, index) => (
              <UserAvatar key={index} userId={user.id} onClick={() =>  history.push(`/profiles/${user.id}`)} />
            ))}
            <IconButton onClick={() => setUserList(options.following)}>
              <ListIcon />
            </IconButton>
          </Box>
        </Paper>
        {user.posts?.map(({ id, ...rest }) => (
          <Post key={id} id={id} user={user} {...rest}/>
        ))}
      </Grid>
      <UserListModal
        open={!!userList}
        onClose={() => setUserList(null)}
        title={userList?.title}
        items={userList ? user[userList.key] : []}
      />
    </Grid>
  );
}

export default ProfilePage;
