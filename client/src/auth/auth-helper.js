const auth = {
  // User authentication functions
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

  // Admin authentication functions

  authenticateAdmin(jwt, callback) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("admin-jwt", JSON.stringify(jwt));
    }
    callback();
  },

  isAdminAuthenticated() {
    if (typeof window === "undefined") return false;

    if (sessionStorage.getItem("admin-jwt"))
      return JSON.parse(sessionStorage.getItem("admin-jwt"));
    else return false;
  },

  clearAdminJWT(callback) {
    if (typeof window !== "undefined") sessionStorage.removeItem("admin-jwt");
    callback();
  },
};

export default auth;
