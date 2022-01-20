# About Biddersverse

-   Biddersverse is a multivendor online auction application for consumer electronic products.

-   Sellers can create listings for bidders to bid on. Bidding takes place within a period of time specified by the seller.

-   At the end of the auction, the system automatically notifies the winning bidder and the seller by email.

-   All sellers must have Stripe accounts to be able to post listings.

-   The winning bidders can pay for the won items (the system only supports card payments for now).

-   A user can use the same account for both selling items and bidding. To be able to sell items, a user needs to activate seller account features in the profile settings (This step requires the user to have a Stripe account or create one).

# Links

-   Checkout the [Repo](https://github.com/Goldenbwuoy/biddersverse "Skedula Repo")

-   Report [Bugs](https://github.com/Goldenbwuoy/biddersverse/issues "Issues Page")

# Main Futures

-   [x] Authentication (Signup & Signin)

-   [x] Browse Auctions

-   [x] Activate seller account (connect Stripe account)

-   [x] Create Listings

-   [x] Update Listing

-   [x] Place Bids

-   [x] Realtime Auction chat rooms (each auction item has its own chat room)

-   [x] Notify the winning bidder and seller by email at the end of the auction.

-   [x] Pay for Items (only card payments are supported)

-   [x] Browse orders

-   [x] Update order status (sellers' feature)

# Screenshots

</br>

![Listings](/assets/screenshots/listings.png "Listings")

![My Listings](/assets/screenshots/mylistings.png "My Listings")

![Place Bid](/assets/screenshots/bid.png "Place Bid")

</br>

</br>

# Installation

Make sure you have Node installed or [download](https://nodejs.org/en/) and install.

## server side

In the project root directory

Install dependencies: `npm install`

create a `.env` file and add the following variables:

```

EMAIL_USER=your_email_address
EMAIL_PASSWORD=email_password

MONGODB_LOCAL_URI=your_mongo_db_uri

JWT_SECRET=your_jwt_token_secret
PORT=port_number

STRIPE_CONNECT_CLIENT_ID=stripe_client_id
STRIPE_TEST_SECRET_KEY=stripe_test_secret_key

```

run server locally: `npm run backend`

## client side

`cd client`

Install dependencies: `npm install`

create a `.env` file and add the following variables:

```

REACT_APP_DEV_SERVER_URL=the_server_url
REACT_APP_CLIENT_ID=stripe_client_id
REACT_APP_PUBLISHABLE_KEY=stripe_test_public_key

```

Run client locally: `npm start`

_Note: concurrently has been for this projects, so the server and the client can be run simulteneously from the root directory._ User the command `npm run dev` in the project root directory, after completing the steps above to run both the client and the server locally.

# Author

**Golden Mumanikidzwa**

-   Check my [Profile](https://github.com/Goldenbwuoy "Goldenbwuoy")

-   Follow me on [Twitter](https://github.com/Goldenbwuoy "Goldenbwuoy")

## 🤝 Support

Contributions, issues, and feature requests are welcome!

Give a ⭐️ if you like this project!
