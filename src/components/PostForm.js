import React, { useState } from 'react';
import { Button, Paper, TextField, useTheme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { MAKE_POST } from '../app/actions';
import { EDIT_POST } from '../app/actions';

function PostForm({ id, onClose, defaultTitle, defaultDescription }) {
  const [ title, setTitle ] = useState(defaultTitle || '');
  const [ description, setDescription ] = useState(defaultDescription || '');
  const dispatch = useDispatch();
  
  const theme = useTheme();
  
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
        onClick={(event) => {
          if (id) {
            dispatch({ type: EDIT_POST, payload: { id,  title, description }});
            onClose();
          } else {
            dispatch({ type: MAKE_POST, payload: { title, description } });
          }
          setTitle('');
          setDescription('');
        }}
      >
        Submit
      </Button>
    </Paper>
  );
}

export default PostForm;