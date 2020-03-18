import React, { useState } from 'react';
import { TextField, Box, Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { SEND_COMMENT } from '../app/actions';

function CommentForm(props) {
  const { id, type } = props;
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  let commentableType = type.charAt(0).toUpperCase() + type.substring(1);

  const handleSend = (event) => {
    event.preventDefault();
    if (message.trim().length > 0) {
      dispatch({
          type: SEND_COMMENT, payload: {
          message,
          commentable_id: id,
          commentable_type: commentableType 
        }
      });
      setMessage('');
    }
  }
  
  return (
    <form onSubmit={handleSend}>
      <Box display="flex" padding={1}>
        <TextField
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