import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
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

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: '1rem',
  },
  title: {
    flexGrow: 1,
    color: '#000',
    textDecoration: 'none',
  },
};

class Header extends Component {
  state = {
    anchorEl: null,
  };

  setAnchorEl = (anchorEl) => {
    this.setState({ anchorEl });
  };

  handleMenu = (event) => {
    this.setAnchorEl(event.currentTarget);
  };

  handleClose = () => {
    this.setAnchorEl(null);
  };

  logout = async () => {
    this.handleClose();
    try {
      await axios.get('http://localhost:3000/api/users/logout', { withCredentials: true });
      this.props.setUser(false);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { classes, auth } = this.props;
    const open = Boolean(this.state.anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position='static' color='transparent'>
          <Toolbar>
            <Typography align='left' component={RouterLink} to='/' variant='h6' className={classes.title}>
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
                  onClick={this.handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={this.state.anchorEl}
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
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose} component={RouterLink} to='/chat'>
                    Chat
                  </MenuItem>
                  <MenuItem onClick={this.handleClose} component={RouterLink} to='/profile'>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={this.logout} component={RouterLink} to='/'>
                    Logout
                  </MenuItem>
                </Menu>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
