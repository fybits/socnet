import React, { useState } from 'react';
import { TextField, Box, Button } from '@material-ui/core';
import axios from 'axios';
import { baseURL } from '../../app/config';

function CommentForm({ id, type, edit, defaultValue, onClose }) {
  const [message, setMessage] = useState(defaultValue);

  // let commentableType = type && (type.charAt(0).toUpperCase() + type.substring(1));
  let isEdit = edit || false;

  const handleSend = async (event) => {
    event.preventDefault();
    if (message.trim().length > 0) {
      if (!isEdit) {
        const { data } = await axios.post(`${baseURL}/comments`, {
          message,
          commentable_type: type,
          commentable_id: id,
        });
      } else {
        // update comment
        onClose();
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