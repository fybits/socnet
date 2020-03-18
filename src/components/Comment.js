import React, { useEffect } from 'react';
import { Box, ListItem, ListItemText, Typography, useTheme } from '@material-ui/core';
import CommentsBlock from './CommentsBlock';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_COMMENTS } from '../app/actions';

function Comment(props) {
  const { id, message, user_id, created_at } = props;

  const comments = useSelector((state) => state.cachedComments.comment[id]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_COMMENTS, payload: { id: id, type: 'comment' } });
  }, []);

  return (
    <ListItem style={{ borderLeft: `2px solid ${useTheme().palette.primary.main}`}} button>
      <ListItemText>
        <Typography>{user_id}</Typography>
        <Typography variant="caption" style={{ color: 'gray' }}>{new Date(created_at).toUTCString()}</Typography>
        <Typography paragraph>{message}</Typography>
        {(comments) ? <CommentsBlock comments={comments}/> : null}
      </ListItemText>
    </ListItem>
  )
}

export default Comment;