import React from "react";
import { Route, Switch } from "react-router-dom";
import Auction from "./auction/Auction";
import AuctionsByCategory from "./auction/AuctionsByCategory";
import EditAuction from "./auction/EditAuction";
import MyAuctions from "./auction/MyAuctions";
import MyBids from "./auction/MyBids";
import MyLiveBids from "./auction/MyLiveBids";
import MyWonBids from "./auction/MyWonBids";
import NewAuction from "./auction/NewAuction";
import OpenAuctions from "./auction/OpenAuctions";
import PrivateRoute from "./auth/PrivateRoute";
import SignIn from "./auth/SignIn";
import Home from "./core/Home";
import Navbar from "./core/Navbar";
import Sidebar from "./core/sidebar/Nav";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import Signup from "./user/Signup";

function MainRouter() {
  return (
    <div>
      {/* <Navbar /> */}
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <PrivateRoute path="/auction/new" component={NewAuction} />
        <PrivateRoute path="/auction/edit/:auctionId" component={EditAuction} />
        <PrivateRoute path="/myauctions" component={MyAuctions} />
        <PrivateRoute path="/auctions/all/bids/:userId" component={MyBids} />
        <PrivateRoute
          path="/auctions/live/bids/:userId"
          component={MyLiveBids}
        />
        <PrivateRoute path="/auctions/won/bids/:userId" component={MyWonBids} />
        <Route path="/auctions/all" component={OpenAuctions} />
        <Route
          path="/auctions/categories/:categoryId"
          component={AuctionsByCategory}
        />
        <Route path="/auction/:auctionId" component={Auction} />
        <Route path="/user/:userId" component={Profile} />
      </Switch>
    </div>
  );
}

export default MainRouter;
