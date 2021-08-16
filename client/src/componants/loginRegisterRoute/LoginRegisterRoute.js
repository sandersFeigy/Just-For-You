import React, { useState } from 'react';
import './LoginRegisterRoute.css';

import Login from './login/Login';
import Register from './register/Register';
import Home from '../home/Home';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function LoginRegistrRoute(props) {
  return (
    <Router>
      <div className="container d-flex align-items-center flex-column">
        <Switch>
          <Route path="/" exact={true}>
            <Register userClassName={props.userClassName} onChangee={props.onChange} />
          </Route>
          <Route path="/register">
            <Register userClassName={props.userClassName} onChange={props.onChange} />
          </Route>
          <Route path="/login">
            <Login userClassName={props.userClassName} onChange={props.onChange} />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

