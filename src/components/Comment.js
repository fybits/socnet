import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  IconButton,
  Box,
  Popover,
  Link,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux';
import CommentsBlock from './CommentsBlock';
import CommentForm from './CommentForm';
import { DELETE_COMMENT } from '../app/actions';
import { Link as RouteLink } from 'react-router-dom';

function Comment(props) {
  const { id, message, user_id, commentable_id, commentable_type, created_at } = props;
  const user = useSelector((state) => state.userData.id)

  const dispatch = useDispatch();

  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <ListItem
      style={{ paddingRight: 0 }}>
      <ListItemText>
        <Link
          href="#"
          component=
          {
            React.forwardRef((props, ref) => {
              return <RouteLink to={`/profiles/${user_id}`} ref={ref} {...props}/>
            })
          }
          >
          {`${user_id} `}
        </Link>
        <Typography variant="caption" style={{ color: 'gray' }}>{new Date(created_at).toUTCString()}</Typography>
        <Typography paragraph>{message}</Typography>
        {
            user === user_id 
            && (
              <Box>
                <Popover open={Boolean(showEditModal)} onClose={() => setShowEditModal(false)} anchorEl={showEditModal}>
                  <CommentForm edit id={id} type={commentable_type} onClose={() => setShowEditModal(false)}/>
                </Popover>
                <IconButton onClick={(event) => {
                    setShowEditModal(event.currentTarget);
                  }} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    dispatch({
                      type: DELETE_COMMENT,
                      payload: {
                        id,
                        commentable_id,
                        commentable_type 
                      }
                    });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )
          }
        <CommentsBlock id={id} type="comment"/>
      </ListItemText>
    </ListItem>
  )
}

export default Comment;