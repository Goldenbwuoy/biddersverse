import React from "react";
import { Route, Switch } from "react-router-dom";
import MyAuctions from "./auction/MyAuctions";
import NewAuction from "./auction/NewAuction";
import PrivateRoute from "./auth/PrivateRoute";
import SignIn from "./auth/SignIn";
import Home from "./core/Home";
import Menu from "./core/Menu";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import Signup from "./user/Signup";
import Users from "./user/Users";

function MainRouter() {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <PrivateRoute path="/auction/new" component={NewAuction} />
        <PrivateRoute path="/myauctions" component={MyAuctions} />
        <Route path="/user/:userId" component={Profile} />
      </Switch>
    </div>
  );
}

export default MainRouter;
