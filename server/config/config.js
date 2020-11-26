const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "The_secret",
  mongoUri: "mongodb://localhost/mern-skeleton",
};

export default config;
