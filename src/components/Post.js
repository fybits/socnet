import React from 'react';
import { Card, CardHeader, CardContent, CardActions, CardActionArea, Typography } from '@material-ui/core';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import { useHistory } from 'react-router-dom';


function Post({ id, user_id, title, description, created_at }) {
  const history = useHistory();

  return (
    <Card style={{ marginTop: 8 }}>
      <CardActionArea onClick={() => history.push(`/posts/${id}`)}>
        <CardHeader title={`${user_id} - ${title}`} subheader={new Date(created_at).toUTCString()}/>
        <CardContent>
          <Typography variant="body1" style={{ whiteSpace: 'pre' }}>{description}</Typography>
        </CardContent>
        <CardActions>
          {/* <CommentOutlinedIcon /> <Typography>{props.comments.length}</Typography> */}
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default Post;