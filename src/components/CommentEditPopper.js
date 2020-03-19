import React from 'react';
import CommentForm from './CommentForm';
import { Popper } from '@material-ui/core';

function CommentEditPopper({ open, onClose, id, anchorEl }) {

  return (
    <Popper open={open} onClose={onClose} >
      <CommentForm id={id}/>
    </Popper>
  )
}

export default CommentEditPopper;