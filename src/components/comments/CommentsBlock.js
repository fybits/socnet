import React, { useEffect, useState } from 'react';
import Comment from './Comment'
import { Box, List, Paper, Typography, useTheme, Button } from '@material-ui/core';
import CommentForm from './CommentForm';
import axios from 'axios';
import { baseURL } from '../../app/config';


function CommentsBlock({ id, type }) {
  const theme = useTheme();
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      console.log()
      const { data } = await axios.get(`${baseURL}/comments/commentable/${type}/${id}`);
      if (data) {
        setComments(data);
      }
    }
    fetchComments();
  }, [id, type])

  const [showForm, setShowForm] = useState(type === 'post');
  return (
    (comments?.length > 0 || showForm )
    ? (
      <Paper style={{ borderLeft: `5px solid ${theme.palette.primary.main}`, marginTop: 8, paddingRight: '8px' }}>
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
    :
    <Button size="small" onClick={() => setShowForm(true)}>answer</Button>
  )
}

export default CommentsBlock;