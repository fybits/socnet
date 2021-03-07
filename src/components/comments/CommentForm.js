import React, { useState } from 'react';
import { TextField, Box, Button } from '@material-ui/core';

function CommentForm({ id, type, edit, defaultValue, onClose }) {
  const [message, setMessage] = useState(defaultValue);

  let commentableType = type && (type.charAt(0).toUpperCase() + type.substring(1));
  let isEdit = edit || false;

  const handleSend = (event) => {
    event.preventDefault();
    if (message.trim().length > 0) {
      if (!isEdit) {
        // New comment
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