const getAuctionImage = (auction) => {
  const BASE_URL = "http://localhost:5000";
  const image = `${BASE_URL}/api/auctions/image/${
    auction._id
  }?${new Date().getTime()}`;
  return image;
};

export { getAuctionImage };
