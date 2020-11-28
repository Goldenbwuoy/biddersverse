const BASE_URL = "http://localhost:5000";

const create = (params, credentials, auction) => {
  return fetch(`${BASE_URL}/api/auctions/by/${params.userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${credentials.token}`,
    },
    body: auction,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

const listOpen = async (signal) => {
  try {
    let response = await fetch(`${BASE_URL}/api/auctions`, {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (params, signal) => {
  try {
    let response = await fetch(`${BASE_URL}/api/auctions/${params.auctionId}`, {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listBySeller = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${BASE_URL}/api/auctions/by/${params.userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.token}`,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, listOpen, listBySeller, read };
