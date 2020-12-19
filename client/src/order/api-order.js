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

export { create };
