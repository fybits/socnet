import React, { useEffect } from 'react';
import { ListItem, ListItemText, Typography, useTheme } from '@material-ui/core';
import CommentsBlock from './CommentsBlock';

function Comment(props) {
  const { id, message, user_id, created_at } = props;

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
        <CommentsBlock id={id} type="comment"/>
      </ListItemText>
    </ListItem>
  )
}

export default Comment;