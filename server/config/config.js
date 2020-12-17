const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "The_secret",
  mongoUri: "mongodb://localhost/biddersverse",
  mongoUri_remote:
    "mongodb+srv://Golden:UsiqKhyLrAgEMRyE@biddersverse.puwe4.mongodb.net/biddersverse?retryWrites=true&w=majority",
  stripe_connect_test_client_id: "ca_IaPZcvj85XD4U8eACzXxBiWEPt6Ph2MA",
  stripe_test_secret_key:
    "sk_test_51HzEJqAZDae27eTYOe4kHPjsoa4BINk7y1pohH7c7tSeXrGCF358qlZw59oHed3tPj0Xgd06Mv3nHtDm2QfOP71a00irH5EFUf",
  stripe_test_api_key:
    "pk_test_51HzEJqAZDae27eTYO4hfTXd8xdWxWFwa6ww149I2Tc85GRGpRHROMOFCCBMm3alAH5YSL2C3b4Yp2sqmJbfYh40h004mEppzdd",
};

module.exports = config;
