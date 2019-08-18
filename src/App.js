import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import './App.css'
import HomePage from "./pages/Home/Home";
import AuthPage from "./pages/Auth/Auth";
import RegisterPage from "./pages/Register/Register";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        {/* <Route path="/home" component={HomePage} /> */}
        <Route path="/login" component={AuthPage} />
        <Route path="/register" component={RegisterPage} />
        <PrivateRoute path="/home" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute({ component, path }) {
  const isLoggedIn = localStorage.getItem('@gql:token') ? true : false;
  return (
    isLoggedIn ? <Route path="/home" component={HomePage} /> : <Redirect to="/login" />
  );
}

export default App;
