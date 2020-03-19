import React from 'react';
import { Dialog } from '@material-ui/core';
import PostForm from './PostForm';

function PostEditDialog(props) {
  const { open, onClose, id } = props;

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <PostForm id={id} onClose={onClose}/>
    </Dialog>
  );
}

export default PostEditDialog;