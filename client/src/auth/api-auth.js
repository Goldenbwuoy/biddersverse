const BASE_URL = "http://localhost:5000";

const signin = async (user) => {
  try {
    let response = await fetch(`${BASE_URL}/api/signin/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //   credentials: "include",
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { signin };
