import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  IconButton,
  Box,
  Popover,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux';
import CommentsBlock from './CommentsBlock';
import CommentEditPopper from './CommentEditPopper';
import CommentForm from './CommentForm';

function Comment(props) {
  const { id, message, user_id, created_at } = props;
  const user = useSelector((state) => state.userData.id)

  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <ListItem
      style={{ borderLeft: `2px solid ${useTheme().palette.primary.main}`, paddingRight: 0 }}
      button
      disableRipple
    >
      <ListItemText>
        <Typography>{user_id}</Typography>
        <Typography variant="caption" style={{ color: 'gray' }}>{new Date(created_at).toUTCString()}</Typography>
        <Typography paragraph>{message}</Typography>
        {
            user === user_id 
            && (
              <Box>
                <Popover open={Boolean(showEditModal)} onClose={() => setShowEditModal(false)} anchorEl={showEditModal}>
                  <CommentForm id={id} onClose={() => setShowEditModal(false)}/>
                </Popover>
                <IconButton onClick={(event) => {
                    setShowEditModal(event.currentTarget);
                  }} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton size="small">
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