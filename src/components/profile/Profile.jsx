import React, { useState, useEffect } from 'react';
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

const Profile = (props) => {

  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [fileBlob, setFileBlob] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getProfile();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const nameHanfdler = (event) => {
    setName(event.target.value);
  };

  const fileHandler = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    setFileBlob(event.target.files[0]);
  };

  const getProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users/profile', {
        withCredentials: true,
      });
      if (res.data?.name) {
        setName(res.data.name);
      }
      if (res.data?.avatar) {
        setFile(res.data.avatar);
      }
      return res;
    } catch (error) {
      this.setState({ error: error.message, snackbarOpen: true });
    }
  };

  const submitProfile = async () => {
    const formData = new FormData();
    if (fileBlob) {
      formData.append('avatar', fileBlob, fileBlob.name);
    }
    formData.append('name', name);

    try {
      await axios.put('http://localhost:3000/api/users/profile', formData, {
        withCredentials: true,
      });
    } catch (error) {
      setError(error.message);
      setSnackbarOpen(true);
    }
  };

  const { classes } = props;
  return (
    <div className={classes.root}>
      <Snackbar open={snackbarOpen} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity='error'>
          {error}
        </Alert>
      </Snackbar>
      <Typography
        margin='normal'
        align='left'
        variant='h3'
        className={classes.title}
      >
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
              value={name}
              onChange={nameHanfdler}
            />
          </Box>
          <Box className={classes.inputFieldWrapper}>
            <Typography margin='normal' align='left' variant='h6'>
              Avatar:
            </Typography>
            <Avatar
              alt={name}
              src={file}
              className={classes.large}
            />
            <input
              accept='image/*'
              onChange={fileHandler}
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
        <Button
          margin='normal'
          variant='contained'
          onClick={submitProfile}
        >
          Save
        </Button>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Profile);
