import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux';
import PostEditDialog from './PostEditDialog';

function Post({ id, user_id, title, description, created_at }) {
  const history = useHistory();
  const user = useSelector((state) => state.userData.id)
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <Card style={{ marginTop: 8 }}>
        <PostEditDialog id={id} open={showEditModal} onClose={() => setShowEditModal(false)}/>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <CardHeader
            title={`${user_id} - ${title}`}
            subheader={new Date(created_at).toUTCString()}
          />
          {
            user === user_id 
            && (
              <Box>
                <CardActions>
                  <IconButton onClick={(event) => {
                      setShowEditModal(true);
                    }} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Box>
            )
          }
        </Box>
        <CardActionArea onClick={() => history.push(`/posts/${id}`)}>
          <CardContent>
            <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>{description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
    </Card>
  );
}

export default Post;