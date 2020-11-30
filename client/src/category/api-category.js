const BASE_URL = "http://localhost:5000";

const listCategories = async (signal) => {
  try {
    let response = await fetch(`${BASE_URL}/api/categories/`, {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { listCategories };
