import React, { useEffect } from 'react';
import Comment from './Comment'
import { Box, List, Paper, Typography } from '@material-ui/core';
import CommentForm from './CommentForm';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_COMMENTS } from '../app/actions';


function CommentsBlock(props) {
  const { type } = props;
  const id = Number(props.id);
  const commentsList = useSelector((state) => state.cachedComments[type][id]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_COMMENTS, payload: { id, type } });
  }, []);

  let comments = commentsList || [];
  return (
    comments ? (
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
            <CommentForm type={type} id={id}/>
          </Box>
        </Paper>
      )
      : null
  )
}

export default CommentsBlock;