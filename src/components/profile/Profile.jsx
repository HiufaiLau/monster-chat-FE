import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import axios from 'axios';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: 1,
      width: 400,
    },
    height: '80vh',
  },
  title: {
    marginBottom: '2rem',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '1rem',
  },
  inputWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '1rem',
  },
  inputFieldWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: '1rem',
  },
  large: {
    width: 100,
    height: 100,
    margin: '2rem',
    alignSelf: 'center',
  },
  input: {
    display: 'none',
  },
  upload: {
    alignSelf: 'center',
  },
};

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

class Profile extends Component {
  state = {
    name: '',
    file: null,
    fileBlob: null,
    snackbarOpen: false,
    error: '',
  };

  async componentDidMount() {
    const res = await this.getProfile();
    if (res.data?.name) {
      this.setState({ name: res.data.name });
    }
    if (res.data?.avatar) {
      this.setState({ file: res.data.avatar });
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  setName = (event) => {
    this.setState({ name: event.target.value });
  };

  setFile = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileBlob: event.target.files[0],
    });
  };

  getProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users/profile', {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      this.setState({ error: error.message, snackbarOpen: true });
    }
  };

  submitProfile = async () => {
    const formData = new FormData();
    if (this.state.fileBlob) {
      formData.append('avatar', this.state.fileBlob, this.state.fileBlob.name);
    }
    formData.append('name', this.state.name);

    try {
      await axios.put('http://localhost:3000/api/users/profile', formData, {
        withCredentials: true,
      });
    } catch (error) {
      this.setState({ error: error.message, snackbarOpen: true });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Snackbar open={this.state.snackbarOpen} autoHideDuration={6000}>
          <Alert onClose={this.handleClose} severity='error'>
            {this.state.error}
          </Alert>
        </Snackbar>
        <Typography margin='normal' align='left' variant='h3' className={classes.title}>
          My Profile!
        </Typography>
        <Paper elevation={3} className={classes.paper}>
          <Box className={classes.inputWrapper}>
            <Box className={classes.inputFieldWrapper}>
              <Typography margin='normal' align='left' variant='h6'>
                Name:
              </Typography>
              <TextField
                fullWidth={true}
                id='outlined-required'
                variant='outlined'
                margin='normal'
                value={this.state.name}
                onChange={this.setName}
              />
            </Box>
            <Box className={classes.inputFieldWrapper}>
              <Typography margin='normal' align='left' variant='h6'>
                Avatar:
              </Typography>
              <Avatar alt={this.state.name} src={this.state.file} className={classes.large} />
              <input
                accept='image/*'
                onChange={this.setFile}
                className={classes.input}
                id='contained-button-file'
                multiple
                type='file'
              />
              <label htmlFor='contained-button-file' className={classes.upload}>
                <Button variant='contained' color='secondary' component='span'>
                  Upload
                </Button>
              </label>
            </Box>
          </Box>
          <Button margin='normal' variant='contained' onClick={this.submitProfile}>
            Save
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
