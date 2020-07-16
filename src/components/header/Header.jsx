import React, { useState, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useStyles } from './style';

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  const handleAnchorEl = (anchorEl) => {
    setAnchorEl(anchorEl);
  };

  const handleMenu = (event) => {
    handleAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    handleAnchorEl(null);
  };

  const logout = async () => {
    handleClose();
    try {
      const resData = await axios.get(
        'http://localhost:3000/api/users/logout',
        {
          withCredentials: true,
        }
      );
      props.setAuth(false);
      console.log('auth :>> ', auth);
      setUser(resData);
      console.log('data :>> ', user);
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles();
  const { auth } = props;
  console.log('auth :>> ', auth);
  // const usernames = users.users ? users.users.map((user) => user.name) : null;
  // console.log('usernames :>> ', usernames);
  const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <AppBar position='static' color='transparent'>
        <Toolbar>
          <Typography
            align='left'
            component={RouterLink}
            to='/'
            variant='h6'
            className={classes.title}
          >
            Monster Chat
          </Typography>
          {!auth && (
            <Fragment>
              <Button color='inherit' component={RouterLink} to='/login'>
                Login
              </Button>

              <Button color='inherit' component={RouterLink} to='/signup'>
                Sign up
              </Button>
            </Fragment>
          )}

          {auth && (
            <Fragment>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                {/* {usernames} */}
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to='/chat'
                >
                  Chat
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to='/profile'
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={logout} component={RouterLink} to='/'>
                  Logout
                </MenuItem>
              </Menu>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
