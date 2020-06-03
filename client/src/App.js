import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import "bootswatch/dist/sketchy/bootstrap.css";
import { Header } from "./components/common/Header";
import authGaurd from "./authGaurd";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/Register";
import isAuthGaurd from "./isAuthGaurd";
import List from "./components/List";
import Search from "./components/Search";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/login" component={isAuthGaurd(Login)} />
            <Route exact path="/register" component={isAuthGaurd(SignUp)} />
            <Route exact path="/list/:id" component={authGaurd(List)} />
            <Route exact path="/" component={authGaurd(Dashboard)} />
            <Route exact path="/search" component={authGaurd(Search)} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
