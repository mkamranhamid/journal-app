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
        <Redirect exact from="/" to="/auth" />
        {/* <Route path="/home" component={HomePage} /> */}
        {/* <Route path="/auth" component={AuthPage} /> */}
        {/* <Route path="/register" component={RegisterPage} /> */}
        <AuthLogic />
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute({ }) {
  const isLoggedIn = localStorage.getItem('@gql:token') ? true : false;
  return (
    <div>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" component={HomePage} />
    </div>
  );
}

function PublicRoutes({ }) {
  const isLoggedIn = localStorage.getItem('@gql:token') ? true : false;
  return (
    <div>
      <Redirect exact from="/" to="/auth" />
      <Route path="/auth" component={AuthPage} />
    </div>
  );
}

function AuthLogic({ }) {
  const isLoggedIn = localStorage.getItem('@gql:token') ? true : false;
  return (
    isLoggedIn ? <PrivateRoute /> : <PublicRoutes />
  );
}



export default App;
