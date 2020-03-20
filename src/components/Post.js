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
import { useSelector, useDispatch } from 'react-redux';
import PostEditDialog from './PostEditDialog';
import { DELETE_POST } from '../app/actions';
import CommentIcon from '@material-ui/icons/Comment';
import RouteLink from './RouteLink';
import PostForm from './PostForm';

function Post({ id, user_id, title, description, created_at }) {
  const history = useHistory();
  const user = useSelector((state) => state.userData.id)
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();

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
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <CardHeader
            title={(
              <Fragment>
                <RouteLink to={`/profiles/${user_id}`}>{`${user_id} `}</RouteLink>
                 - {title}
              </Fragment>
            )}
            subheader={new Date(created_at).toUTCString()}
          />
          {
            user === user_id 
            && (
              <Box>
                <CardActions>
                  <IconButton onClick={(event) => {
                      setShowEditModal(true);
                    }} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={(event) => {
                    dispatch({ type: DELETE_POST, payload: { id }});
                  }}>
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