import React, { useState } from 'react';
import { Button, Paper, TextField, useTheme } from '@material-ui/core';
import axios from 'axios';
import { baseURL } from '../../app/config';

function PostForm({ id, onClose, defaultTitle, defaultDescription }) {
  const [ title, setTitle ] = useState(defaultTitle || '');
  const [ description, setDescription ] = useState(defaultDescription || '');

  const theme = useTheme();

  const submitForm = async (event) => {
    if (id) {
      // edit
      await axios.put(`${baseURL}/posts/${id}`, { title, description });
      onClose();
    } else {
      // create
      await axios.post(`${baseURL}/posts`, { title, description });
    }
    setTitle('');
    setDescription('');
  }

  return (
    <Paper style={{ padding: theme.spacing(2), display: 'flex', flexDirection: 'column' }}>
      <TextField
        variant="outlined"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />
      <TextField
        multiline
        rows={ description.length ? 7 : 3}
        variant="outlined"
        placeholder="Share some stuff with the world..."
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
        helperText={`${description.length}/400`}
        FormHelperTextProps={{ style: { marginLeft: 'auto', marginTop: '-2em', flexBasis: '2em' } }}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!(title.trim().length && description.trim().length) || description.length > 400}
        onClick={submitForm}
      >
        Submit
      </Button>
    </Paper>
  );
}

export default PostForm;