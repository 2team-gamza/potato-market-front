import React from 'react';
import { IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const DeleteButton = ({ onDeleteButtonClick, product }) => {
  return (
    <IconButton
      edge="end"
      aria-label="delete"
      color="primary"
      onClick={() => {
        onDeleteButtonClick(product.id);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
};
export default DeleteButton;
