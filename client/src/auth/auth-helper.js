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
  updateUser(user, cb) {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("jwt")) {
        let auth = JSON.parse(sessionStorage.getItem("jwt"));
        auth.user = user;
        sessionStorage.setItem("jwt", JSON.stringify(auth));
        cb();
      }
    }
  },
};

export default auth;
