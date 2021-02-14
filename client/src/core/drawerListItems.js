export const auctionsListItems = [
  {
    title: "All Auctions",
    path: "/auctions/all/by-seller",
    status: "all",
  },
  {
    title: "Live Auctions",
    path: "/auctions/live/by-seller",
    status: "live",
  },
  {
    title: "Sold Auctions",
    path: "/auctions/sold/by-seller",
    status: "sold",
  },
];

export const bidsListItems = [
  { title: "All Placed Bids", path: `/auctions/all/bids`, status: "all" },
  { title: "Live Bids", path: `/auctions/live/bids`, status: "live" },
  { title: "Won Bids", path: `/auctions/won/bids`, status: "won" },
];
