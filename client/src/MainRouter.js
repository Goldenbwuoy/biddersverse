import React from "react";
import { Route, Switch } from "react-router-dom";
import Auction from "./auction/Auction";
import AuctionsByBidder from "./auction/AuctionsByBidder";
import AuctionsByCategory from "./auction/AuctionsByCategory";
import EditAuction from "./auction/EditAuction";
import AuctionsBySeller from "./auction/AuctionsBySeller";
import NewAuction from "./auction/NewAuction";
import OpenAuctions from "./auction/OpenAuctions";
import UserRoute from "./auth/UserRoute";
import SignIn from "./auth/SignIn";
import Home from "./core/Home";
import Nav from "./core/Nav";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import Signup from "./user/Signup";
import StripeConnect from "./user/StripeConnect";
import Order from "./order/Order";
import SellerOrders from "./order/SellerOrders";
import MyOrders from "./order/MyOrders";
import AdminSignIn from "./auth/AdminSignIn";
import Dashboard from "./admin/dashboard/Dashboard";
import PublicRoute from "./auth/PublicRoute";
import AdminRoute from "./auth/AdminRoute";
import AdminHome from "./admin/dashboard/Home";
import Users from "./admin/users/Users";
import Auctions from "./admin/auctions/Auctions";
import Categories from "./admin/categories/Categories";
import Orders from "./admin/orders/Orders";
import NewUser from "./admin/users/NewUser";
import EditUser from "./admin/users/EditUser";

function MainRouter() {
  return (
    <div>
      {/* <Nav /> */}
      <Switch>
        <PublicRoute exact path="/" component={Home} />
        <PublicRoute path="/signup" component={Signup} />
        <PublicRoute path="/signin" component={SignIn} />
        <PublicRoute path="/adminLogin" component={AdminSignIn} />
        <UserRoute path="/seller/stripe/connect" component={StripeConnect} />
        <UserRoute path="/user/edit/:userId" component={EditProfile} />
        <UserRoute path="/auction/new" component={NewAuction} />
        <UserRoute path="/auction/edit/:auctionId" component={EditAuction} />
        <UserRoute
          path="/auctions/all/by-seller"
          component={AuctionsBySeller}
        />
        <UserRoute
          path="/auctions/live/by-seller"
          component={AuctionsBySeller}
        />
        <UserRoute
          path="/auctions/sold/by-seller"
          component={AuctionsBySeller}
        />
        <UserRoute path="/auctions/all/bids" component={AuctionsByBidder} />
        <UserRoute path="/auctions/live/bids" component={AuctionsByBidder} />
        <UserRoute path="/auctions/won/bids" component={AuctionsByBidder} />
        <UserRoute path="/order/:orderId" component={Order} />
        <UserRoute path="/seller/orders" component={SellerOrders} />
        <UserRoute path="/buyer/orders" component={MyOrders} />
        <PublicRoute path="/auctions/all" component={OpenAuctions} />
        <PublicRoute
          path="/auctions/categories/:categoryId"
          component={AuctionsByCategory}
        />
        <PublicRoute path="/auction/:auctionId" component={Auction} />
        <PublicRoute path="/user/:userId" component={Profile} />

        <AdminRoute path="/admin/home" component={AdminHome} />
        <AdminRoute exact path="/admin/users" component={Users} />
        <AdminRoute path="/admin/create/user" component={NewUser} />
        <AdminRoute path="/admin/edit/user/:userId" component={EditUser} />
        <AdminRoute path="/admin/auctions" component={Auctions} />
        <AdminRoute path="/admin/categories" component={Categories} />
        <AdminRoute path="/admin/orders" component={Orders} />
      </Switch>
    </div>
  );
}

export default MainRouter;
