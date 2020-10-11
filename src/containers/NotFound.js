import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert severity="error">
        <AlertTitle>404 Error</AlertTitle>
        Not Found
      </Alert>
    </div>
  );
};

export default NotFound;
