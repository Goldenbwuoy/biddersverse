const getAuctionImage = (auction) => {
  const BASE_URL = "http://localhost:5000";
  const image = `${BASE_URL}/api/auctions/image/${
    auction._id
  }?${new Date().getTime()}`;
  return image;
};

const getDateString = (date) => {
  let year = date.getFullYear();
  let day =
    date.getDate().toString().length === 1
      ? "0" + date.getDate()
      : date.getDate();
  let month =
    date.getMonth().toString().length === 1
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let hours =
    date.getHours().toString().length === 1
      ? "0" + date.getHours()
      : date.getHours();
  let minutes =
    date.getMinutes().toString().length === 1
      ? "0" + date.getMinutes()
      : date.getMinutes();
  let dateString = `${year}-${month}-${day}T${hours}:${minutes}`;
  return dateString;
};

export { getAuctionImage, getDateString };
