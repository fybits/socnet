import React, { useState, Fragment } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Button,
  Dialog,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CommentIcon from '@material-ui/icons/Comment';
import RouteLink from '../common/RouteLink';
import PostForm from './PostForm';
import { useUserContext } from '../../app/UserContext';
import { baseURL, timeAgo } from '../../app/config';
import axios from 'axios';
import UserAvatar from '../common/UserAvatar';

const Post = ({ id, user_id, user, title, description, created_at }) => {
  const history = useHistory();
  const { userData: { id: currentUser }} = useUserContext();
  const [showEditModal, setShowEditModal] = useState(false);

  const deletePost = async () => {
    const { data } = await axios.delete(`${baseURL}/posts/${id}`);
  };

  return (
    <Card style={{ marginTop: 8 }}>
        <Dialog fullWidth open={showEditModal} onClose={() => setShowEditModal(false)}>
          <PostForm
            defaultTitle={title}
            defaultDescription={description}
            id={id}
            onClose={() => setShowEditModal(false)}
          />
        </Dialog>
        <Box display="flex" alignItems="top" justifyContent="space-between">
          <CardHeader
            title={(
              <>
                <RouteLink to={`/profiles/${user_id}`}>
                  <UserAvatar userId={user_id} />
                  {`${user?.first_name} ${user?.last_name} `}
                </RouteLink>
                 - {title}
              </>
            )}
            subheader={timeAgo.format(new Date(created_at))}
          />
          {
            currentUser === user_id
            && (
              <Box>
                <CardActions>
                  <IconButton onClick={(event) => {
                      setShowEditModal(true);
                    }} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={deletePost}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Box>
            )
          }
        </Box>
        <CardContent>
          <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>{description}</Typography>
        </CardContent>
        <CardActions>
          <Button startIcon={<CommentIcon />} onClick={() => history.push(`/posts/${id}`)}>
            Comments
          </Button>
        </CardActions>
    </Card>
  );
}

export default Post;