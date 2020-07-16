import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Header from '../header/Header';
import LandingPage from '../landingPage/LandingPage';
import Signup from '../signup/Signup';
import Login from '../login/Login';
import Profile from '../profile/Profile';
import Chat from '../chat/Chat';

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

const App = () => {
  const [auth, setAuth] = useState(false);
  const [users, setUsers] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        'http://localhost:3000/api/users/isAuthenticated',
        { withCredentials: true }
      );
      if (res?.data?.sucess) {
        setAuth(true);
        setUserId(res.data.userId);
      }
      const resData = await axios.get('http://localhost:3000/api/users', {
        withCredentials: true,
      });
      setUsers(resData.data);
      console.log('data :>> ', users);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Router>
        <Header
          auth={auth}
          setAuth={setAuth}
          users={users}
        />

        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>

          <Route path='/signup'>
            <Signup />
          </Route>

          <Route path='/login'>
            <Login setUser={setUsers} setAuth={setAuth} setUserId={setUserId} userId={userId}/>
          </Route>

          <Route path='/profile'>
            <Profile />
          </Route>

          <Route path='/chat'>
            <Chat userId={userId} users={users} setUsers={setUsers} />
          </Route>

          <Route path='*'>
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
