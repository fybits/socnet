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
import CommentsBlock from './CommentsBlock';
import CommentForm from './CommentForm';
import RouteLink from '../common/RouteLink';
import { useUserContext } from '../../app/UserContext';
import UserAvatar from '../common/UserAvatar';
import axios from 'axios';
import { baseURL, timeAgo } from '../../app/config';

const Comment = ({ id, message, user_id, user, commentable_id, commentable_type, created_at }) => {
  const { userData: { id: authUser }} = useUserContext();

  const [showEditModal, setShowEditModal] = useState(null);

  const deleteComment = async () => {
    const { data } = await axios.delete(`${baseURL}/comments/${id}`);
  };

  return (
    <ListItem
      style={{ paddingRight: 0, paddingLeft: 4, borderTop: '1px solid gray' }}>
      <ListItemText>
        <RouteLink to={`/profiles/${user_id}`}>
          <UserAvatar userId={user_id} />
          {`${user.first_name} ${user.last_name}  `}
          </RouteLink>
        <Typography variant="caption" style={{ color: 'gray' }}>{timeAgo.format(new Date(created_at))}</Typography>
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
                  onClick={deleteComment}
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