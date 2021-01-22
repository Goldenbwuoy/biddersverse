const BASE_URL = "http://localhost:5000";
const create = async (params, credentials, order, token) => {
  try {
    let response = await fetch(`${BASE_URL}/api/orders/${params.userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.token}`,
      },
      body: JSON.stringify({ order: order, token: token }),
    });
    return response.json();
  } catch (err) {}
};

const listBySeller = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      `${BASE_URL}/api/orders/seller/${params.userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
        signal,
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByBuyer = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      `${BASE_URL}/api/orders/buyer/${params.userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
        signal,
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${BASE_URL}/api/order/${params.orderId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.token}`,
      },
      signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getStatusValues = async (signal) => {
  try {
    let response = await fetch(`${BASE_URL}/api/orders/status_values`, {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, credentials, status) => {
  try {
    let response = await fetch(
      `${BASE_URL}/api/order/status/${params.orderId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
        body: JSON.stringify(status),
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const processCharge = async (params, credentials, order) => {
  try {
    let response = await fetch(
      `${BASE_URL}/api/order/${params.orderId}/charge/${params.userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
        body: JSON.stringify(order),
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const submitReview = async (params, credentials, review) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/order/review/${params.orderId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
        body: JSON.stringify(review),
      }
    );

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  create,
  listBySeller,
  getStatusValues,
  listByBuyer,
  read,
  update,
  processCharge,
  submitReview,
};
