import React, { useEffect } from 'react';
import Comment from './Comment'
import { Box, List, Paper, Typography } from '@material-ui/core';
import CommentForm from './CommentForm';


function CommentsBlock(props) {
  const { id, post } = props;
  const comments = props.comments || [];

  useEffect(() => {
    console.log("Comments changed");
  }, [comments])

  return (
    <Paper style={{ marginTop: 8 }}>
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
        <CommentForm updateComments={props.updateComments} post={post || false} id={id}/>
      </Box>
    </Paper>
  )
}

export default CommentsBlock;