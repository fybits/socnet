import React from 'react';
import { Card, CardHeader, CardContent, CardActions, CardActionArea, Typography } from '@material-ui/core';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

function Post(props) {

  return (
    <Card style={{ marginTop: 8 }}>
      <CardActionArea>
        <CardHeader title={props.title} subheader={new Date(props.date).toUTCString()}/>
        <CardContent>
          <Typography variant="body1">{props.description}</Typography>
        </CardContent>
        <CardActions>
          <CommentOutlinedIcon /> <Typography>{props.comments.length}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default Post;