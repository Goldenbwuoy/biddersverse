const BASE_URL = "http://localhost:5000/api";

const listUsers = async (credentials, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/users`, {
      method: "GET",
      signal: signal,
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

const createUser = async (credentials, user) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.token}`,
      },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const readUser = async (params, credentials, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/users/${params.userId}`, {
      method: "GET",
      signal: signal,
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

const updateUser = async (params, credentials, user) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/users/${params.userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.token}`,
      },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (params, credentials, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/users/${params.userId}`, {
      method: "DELETE",
      signal: signal,
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

const listAuctions = async (credentials, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/auctions`, {
      method: "GET",
      signal: signal,
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

const deleteAuction = async (params, credentials, signal) => {
  try {
    const response = await fetch(
      `${BASE_URL}/admin/auctions/${params.auctionId}`,
      {
        method: "DELETE",
        signal: signal,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listOrders = async (credentials, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/orders`, {
      method: "GET",
      signal: signal,
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

const listRecentOrders = async (credentials, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/orders/recent`, {
      method: "GET",
      signal: signal,
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

const listCategories = async (credentials, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/categories`, {
      method: "GET",
      signal: signal,
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

const createCategory = async (credentials, category) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/categories`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.token}`,
      },
      body: JSON.stringify(category),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const readCategory = async (params, credentials, signal) => {
  try {
    const response = await fetch(
      `${BASE_URL}/admin/categories/${params.categoryId}`,
      {
        method: "GET",
        signal: signal,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const updateCategory = async (params, credentials, category) => {
  try {
    const response = await fetch(
      `${BASE_URL}/admin/categories/${params.categoryId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
        body: JSON.stringify(category),
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteCategory = async (params, credentials, signal) => {
  try {
    const response = await fetch(
      `${BASE_URL}/admin/categories/${params.categoryId}`,
      {
        method: "DELETE",
        signal: signal,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  listUsers,
  createUser,
  readUser,
  updateUser,
  deleteUser,
  listAuctions,
  deleteAuction,
  listOrders,
  listRecentOrders,
  listCategories,
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
};
