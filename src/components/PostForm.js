import React, { useState } from 'react';
import { Button, Paper, TextField, useTheme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { MAKE_POST } from '../app/actions';

function PostForm() {
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const dispatch = useDispatch();
  

  const theme = useTheme();
  console.log(theme.breakpoints.width('md'))
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
        helperText={`${description.length}/140`}
        FormHelperTextProps={{ style: { marginLeft: 'auto', marginTop: '-2em', flexBasis: '2em' } }}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!(title.trim().length && description.trim().length) || description.length > 140}
        onClick={(event) => {
          dispatch({ type: MAKE_POST, payload: { title, description } });
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