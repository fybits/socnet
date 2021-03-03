import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Box,
  Popover,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux';
import CommentsBlock from './CommentsBlock';
import CommentForm from './CommentForm';
import { DELETE_COMMENT } from '../app/actions';
import RouteLink from './RouteLink';

function Comment(props) {
  const { id, message, user_id, user, commentable_id, commentable_type, created_at } = props;
  const authUser = useSelector((state) => state.userData.id)

  const dispatch = useDispatch();

  const [showEditModal, setShowEditModal] = useState(null);
  return (
    <ListItem
      style={{ paddingRight: 0, paddingLeft: 8 }}>
      <ListItemText>
        <RouteLink to={`/profiles/${user_id}`}>{`${user.first_name} ${user.last_name}  `}</RouteLink>
        <Typography variant="caption" style={{ color: 'gray' }}>{new Date(created_at).toUTCString()}</Typography>
        <Typography paragraph>{message}</Typography>
        {
            authUser === user_id
            && (
              <Box>
                <Popover open={Boolean(showEditModal)} onClose={() => setShowEditModal(null)} anchorEl={showEditModal}>
                  <CommentForm defaultValue={message} edit id={id} type={commentable_type} onClose={() => setShowEditModal(null)}/>
                </Popover>
                <IconButton onClick={(event) => {
                    setShowEditModal(event.currentTarget);
                  }} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    dispatch({
                      type: DELETE_COMMENT,
                      payload: {
                        id,
                        commentable_id,
                        commentable_type
                      }
                    });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )
          }
        <CommentsBlock id={id} type="comment"/>
      </ListItemText>
    </ListItem>
  )
}

export default Comment;