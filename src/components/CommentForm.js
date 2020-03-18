import React, { useState } from 'react';
import { TextField, Box, Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { SEND_COMMENT } from '../app/actions';

function CommentForm(props) {
  const { id } = props;
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  let type = (props.post) ? 'Post' : 'Comment';

  const handleSend = (event) => {
    event.preventDefault();
    if (message.trim().length > 0) {
      dispatch({
          type: SEND_COMMENT, payload: {
          message,
          commentable_id: id,
          commentable_type: type 
        }
      });
      setMessage('');
    }
  }
  
  return (
    <Box padding={1}>
      <form onSubmit={handleSend}>
        <TextField
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </Box>
    
  )
}

export default CommentForm;