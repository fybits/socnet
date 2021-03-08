import { Avatar, Card, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText, Modal, withStyles } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router';
import UserAvatar from './UserAvatar';

const styles = (theme) => ({
  modal: {
    width: '50%',
    outline: 'none',
    margin: '10vh auto',
  },
});

const UserListModal = ({ classes, open, onClose, title = 'Users', items }) => {
  const history = useHistory();

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Card className={classes.modal}>
        <CardHeader
          title={title}
        />
        <CardContent>
          <List>
            {items.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => history.push(`/profiles/${item.id}`)}
              >
                <ListItemIcon>
                  <UserAvatar userId={item.id} />
                </ListItemIcon>
                <ListItemText primary={`${item.first_name} ${item.last_name}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default withStyles(styles)(UserListModal);


