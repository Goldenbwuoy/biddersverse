const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "The_secret",
  mongoUri: "mongodb://localhost/biddersverse",
  mongoUri_remote:
    "mongodb+srv://Golden:UsiqKhyLrAgEMRyE@biddersverse.puwe4.mongodb.net/biddersverse?retryWrites=true&w=majority",
};

module.exports = config;
