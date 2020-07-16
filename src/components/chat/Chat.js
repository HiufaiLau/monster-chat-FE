import React, { useState, useEffect, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Message from '../message/Message';
import io from 'socket.io-client';

import { styles } from './styles';
const socket = io('http://localhost:3000');

const Chat = (props) => {
  const [chatMessages, setchatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const socketIo = async () => {
      socket.on('chat message', (chatDetails) => {
        setchatMessages((messages) => [...messages, chatDetails]);
      });
      socket.on('chat history', (chat) => {
        console.log(chat);
        setchatMessages(chat);
      });
    };
    socketIo();
  }, [socket, chatMessages]);

  const handleInputMessage = (event) => {
    setInputMessage(event.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('chat message', inputMessage);
    setInputMessage('');
  };

  console.log('chatMessage', chatMessages);
  const { classes } = props;
  const renderMessages = chatMessages
    ? chatMessages.map((message, index) => {
        const isMyMessage = props.userId === message.userId;
        return (
          <Grid
            item
            className={isMyMessage ? classes.myMessage : ''}
            key={index}
          >
            <Message message={message} isMyMessage={isMyMessage} />
          </Grid>
        );
      })
    : null;

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth='xl'>
        <Grid container>
          <Grid item container className={classes.center} xs={12}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Paper variant='outlined' className={classes.paper}>
                <Grid item container direction='column'>
                  {renderMessages}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>

          <Grid item container className={classes.center} xs={12}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Grid container item spacing={2} className={classes.center}>
                <Grid item xs={10}>
                  <TextField
                    id='chat-input'
                    size='small'
                    placeholder='Enter message here...'
                    fullWidth
                    value={inputMessage}
                    onChange={handleInputMessage}
                    margin='normal'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant='contained' onClick={sendMessage}>
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default withStyles(styles)(Chat);
