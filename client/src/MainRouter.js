import React from "react";
import { Route, Switch } from "react-router-dom";
import Auction from "./auction/Auction";
import AuctionsByBidder from "./auction/AuctionsByBidder";
import AuctionsByCategory from "./auction/AuctionsByCategory";
import EditAuction from "./auction/EditAuction";
import AuctionsBySeller from "./auction/AuctionsBySeller";
import NewAuction from "./auction/NewAuction";
import OpenAuctions from "./auction/OpenAuctions";
import PrivateRoute from "./auth/PrivateRoute";
import SignIn from "./auth/SignIn";
import Home from "./core/Home";
import Nav from "./core/Nav";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import Signup from "./user/Signup";
import StripeConnect from "./user/StripeConnect";

function MainRouter() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={SignIn} />
        <Route path="/seller/stripe/connect" component={StripeConnect} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <PrivateRoute path="/auction/new" component={NewAuction} />
        <PrivateRoute path="/auction/edit/:auctionId" component={EditAuction} />
        <PrivateRoute
          path="/auctions/all/by-seller"
          component={AuctionsBySeller}
        />
        <PrivateRoute
          path="/auctions/live/by-seller"
          component={AuctionsBySeller}
        />
        <PrivateRoute
          path="/auctions/sold/by-seller"
          component={AuctionsBySeller}
        />
        <PrivateRoute path="/auctions/all/bids" component={AuctionsByBidder} />
        <PrivateRoute path="/auctions/live/bids" component={AuctionsByBidder} />
        <PrivateRoute path="/auctions/won/bids" component={AuctionsByBidder} />
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
