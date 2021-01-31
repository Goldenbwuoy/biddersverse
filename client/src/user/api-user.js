const BASE_URL = "http://localhost:5000";

const create = async (user) => {
  try {
    let response = await fetch(`${BASE_URL}/api/users/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const list = async (signal) => {
  try {
    let response = await fetch(`${BASE_URL}/api/users/`, {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${BASE_URL}/api/users/${params.userId}`, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await fetch(`${BASE_URL}/api/users/${params.userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.token}`,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(`${BASE_URL}/api/users/${params.userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const stripeUpdate = async (params, credentials, auth_code, signal) => {
  try {
    let response = await fetch(`${BASE_URL}/api/stripe_auth/${params.userId}`, {
      method: "PUT",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.token}`,
      },
      body: JSON.stringify({ stripe: auth_code }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listReviews = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      `${BASE_URL}/api/reviews/user/${params.userId}`,
      {
        method: "GET",
        signal: signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, list, read, update, remove, stripeUpdate, listReviews };
