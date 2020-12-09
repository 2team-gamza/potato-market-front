import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Favorite } from '@material-ui/icons';
import { Avatar, ListItemAvatar } from '@material-ui/core';

const MyLikesList = ({ myLikes, setMyLikes }) => {
  return (
    <>
      {myLikes.map((product) => (
        <ListItem button>
          <ListItemAvatar>
            <Avatar src={product.profile_url} />
          </ListItemAvatar>
          <ListItemText primary={product.name} />
          <ListItemIcon>
            <Favorite style={{ fill: 'red' }} />
          </ListItemIcon>
        </ListItem>
      ))}
    </>
  );
};

export default MyLikesList;
