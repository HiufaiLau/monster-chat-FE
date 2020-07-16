import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: 1,
      width: 400,
    },
    height: '80vh',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '1rem',
  },
};

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState('');
  const [toChat, setToChat] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitLogin = async () => {
    if (email.trim().length < 1) {
      setError('Please enter an email!');
      setSnackbarOpen(true);
      return;
    }
    if (password.trim().length < 1) {
      setError('Please enter a password!');
      setSnackbarOpen(true);
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:3000/api/users/login',
        {
          username: email,
          password: password,
        },
        { withCredentials: true }
      );
      if (res?.data?.sucess) {
        props.setAuth(true);
        props.setUserId(res.data.userId);
      }

      console.log('auth :>> ', auth);

      setToChat(true);
    } catch (error) {
      setError(error.message);
      setSnackbarOpen(true);
    }
  };

  if (toChat) {
    return <Redirect to='/chat' />;
  }

  const { classes, auth } = props;
  return (
    <div className={classes.root}>
      <Snackbar open={snackbarOpen} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity='error'>
          {error}
        </Alert>
      </Snackbar>
      <Paper elevation={3} className={classes.paper}>
        <Typography
          margin='normal'
          align='left'
          variant='h3'
          className={classes.title}
        >
          Login!
        </Typography>
        <TextField
          fullWidth={true}
          required
          id='outlined-required'
          label='E-Mail'
          variant='outlined'
          margin='normal'
          value={email}
          onChange={emailHandler}
        />
        <TextField
          fullWidth={true}
          required
          id='outlined-required'
          label='Password'
          type='password'
          variant='outlined'
          margin='normal'
          value={password}
          onChange={passwordHandler}
        />

        <Button margin='normal' variant='contained' onClick={submitLogin}>
          Login
        </Button>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Login);
