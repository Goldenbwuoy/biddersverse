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

export { create, listBySeller, getStatusValues, listByBuyer, read };
