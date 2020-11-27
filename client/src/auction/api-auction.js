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

export { create };
