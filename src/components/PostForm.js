import React from 'react';
import { Button, Paper, TextField, TextareaAutosize, useTheme } from '@material-ui/core';

function PostForm() {
  const theme = useTheme();
  console.log(theme.breakpoints.width('md'))
  return (
    <Paper style={{ padding: theme.spacing(2), display: 'flex', flexDirection: 'column' }}>
      <TextField variant="outlined" label="Title"/>
      <TextField multiline rows={7} variant="outlined"/>
      <Button>Bruh</Button>
    </Paper>
  );
}

export default PostForm;