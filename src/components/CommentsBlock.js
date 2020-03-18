import React from 'react';
import Comment from './Comment'
import { Box, List, Paper, Typography } from '@material-ui/core';


function CommentsBlock(props) {
  const comments = props.comments || [];

  return (
    <Paper style={{ marginTop: 8 }}>
      <Box marginLeft={1}>
        <Typography variant="caption">{comments.length} comments</Typography> 
        <List>
          {
            comments.map((comment) => (
              <Comment key={comment.id} {...comment}/>
              ))
            }
        </List>
      </Box>
    </Paper>
  )
}

export default CommentsBlock;