const BASE_URL = "http://localhost:5000";

const list = async (signal) => {
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

export { list };
