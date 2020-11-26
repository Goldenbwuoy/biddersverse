const auth = {
  authenticate(jwt, callback) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    }
    callback();
  },

  isAuthenticated() {
    if (typeof window === "undefined") return false;

    if (sessionStorage.getItem("jwt"))
      return JSON.parse(sessionStorage.getItem("jwt"));
    else return false;
  },

  clearJWT(callback) {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
    callback();
  },
};

export default auth;
