import React from 'react';
import { Dialog } from '@material-ui/core';
import PostForm from './PostForm';

function PostEditDialog(props) {
  const { open, onClose, ...rest } = props;

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <PostForm onClose={onClose} {...rest}/>
    </Dialog>
  );
}

export default PostEditDialog;