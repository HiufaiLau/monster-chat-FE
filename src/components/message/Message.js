import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';

const Message = (props) => {
  const { classes, message, isMyMessage } = props;

  return (
    <Fragment>
      {isMyMessage && (
        <Paper
          variant='elevation'
          className={`${classes.message} ${classes.myMessage}`}
        >
          {message.text}
        </Paper>
      )}
      {!isMyMessage && (
        <Paper variant='elevation' className={`${classes.message}`}>
          {message.userName} : {message.text}
        </Paper>
      )}
    </Fragment>
  );
};

export default withStyles(styles)(Message);
