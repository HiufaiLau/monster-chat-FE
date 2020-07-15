import React, { Component } from 'react';
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

class Login extends Component {
  state = {
    email: '',
    password: '',
    repeatedPassword: '',
    snackbarOpen: false,
    error: '',
    toLogin: false,
    toChat: false,
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  setEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitLogin = async () => {
    if (this.state.email.trim().length < 1) {
      this.setState({ error: 'Please enter an email!', snackbarOpen: true });
      return;
    }
    if (this.state.password.trim().length < 1) {
      this.setState({ error: 'Please enter a password!', snackbarOpen: true });
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:3000/api/users/login',
        {
          username: this.state.email,
          password: this.state.password,
        },
        { withCredentials: true }
      );

      this.props.setUser(true, res.data.userId);
      this.setState({ toChat: true });
    } catch (error) {
      this.setState({ error: error.message, snackbarOpen: true });
    }
  };

  render() {
    if (this.state.toChat) {
      return <Redirect to='/chat' />;
    }

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Snackbar open={this.state.snackbarOpen} autoHideDuration={6000}>
          <Alert onClose={this.handleClose} severity='error'>
            {this.state.error}
          </Alert>
        </Snackbar>
        <Paper elevation={3} className={classes.paper}>
          <Typography margin='normal' align='left' variant='h3' className={classes.title}>
            Login!
          </Typography>
          <TextField
            fullWidth={true}
            required
            id='outlined-required'
            label='E-Mail'
            variant='outlined'
            margin='normal'
            value={this.state.email}
            onChange={this.setEmail}
          />
          <TextField
            fullWidth={true}
            required
            id='outlined-required'
            label='Password'
            type='password'
            variant='outlined'
            margin='normal'
            value={this.state.password}
            onChange={this.setPassword}
          />

          <Button margin='normal' variant='contained' onClick={this.submitLogin}>
            Login
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
