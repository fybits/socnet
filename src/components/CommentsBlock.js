import React, { useState } from 'react';
import Comment from './Comment'
import { Box, List, Paper, Typography, useTheme, Button } from '@material-ui/core';
import CommentForm from './CommentForm';
import { useSelector } from 'react-redux';


function CommentsBlock(props) {
  const { type } = props;
  const id = Number(props.id);
  const commentsList = useSelector((state) => state.cachedComments[type][id]);
  const theme = useTheme();
  let comments = commentsList || [];
  const [showForm, setShowForm] = useState(type === 'post');
  return (
    (comments.length > 0 || showForm ) ? (
        <Paper style={{ borderLeft: `5px solid ${theme.palette.primary.main}`, marginTop: 8 }}>
          <Box marginLeft={1}>
            <Typography variant="caption">{comments.length} comments</Typography> 
            {
              (comments.length > 0) && (
                <List>
                  {
                    comments.map((comment) => (
                      <Comment key={comment.id} {...comment}/>
                    ))
                  }
                </List>
              )
            }
            <CommentForm type={type} id={id}/>
          </Box>
        </Paper>
      )
      : <Button size="small" onClick={() => setShowForm(true)}>answer</Button>
  )
}

export default CommentsBlock;