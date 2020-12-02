import React from "react";
import { Route, Switch } from "react-router-dom";
import Auction from "./auction/Auction";
import MyAuctions from "./auction/MyAuctions";
import NewAuction from "./auction/NewAuction";
import OpenAuctions from "./auction/OpenAuctions";
import PrivateRoute from "./auth/PrivateRoute";
import SignIn from "./auth/SignIn";
import Home from "./core/Home";
import Menu from "./core/Menu";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import Signup from "./user/Signup";

function MainRouter() {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <PrivateRoute path="/auction/new" component={NewAuction} />
        <PrivateRoute path="/myauctions" component={MyAuctions} />
        <Route path="/auctions/all" component={OpenAuctions} />
        <Route path="/auction/:auctionId" component={Auction} />
        <Route path="/user/:userId" component={Profile} />
      </Switch>
    </div>
  );
}

export default MainRouter;
