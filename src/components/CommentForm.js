import React, { useState } from 'react';
import { TextField, Box, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { SEND_COMMENT, EDIT_COMMENT } from '../app/actions';

function CommentForm(props) {
  const { id, type, edit } = props;
  const [message, setMessage] = useState(props.defaultValue || '');
  const dispatch = useDispatch();

  let commentableType = type && (type.charAt(0).toUpperCase() + type.substring(1));
  let isEdit = edit || false;

  const handleSend = (event) => {
    event.preventDefault();
    if (message.trim().length > 0) {
      if (!isEdit) {
        dispatch({
          type: SEND_COMMENT, payload: {
            message,
            commentable_id: id,
            commentable_type: commentableType 
          }
        });
      } else {
        dispatch({
          type: EDIT_COMMENT, payload: {
            id: id,
            message,
          }
        });
        props.onClose();
      }
      setMessage('');
    }
  }
  
  return (
    <form onSubmit={handleSend}>
      <Box display="flex" padding={1}>
        <TextField
          autoFocus
          style={{ flexGrow: 1 }}
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
        />
        <Button type="submit">Send</Button>
      </Box>
    </form>
  )
}

export default CommentForm;