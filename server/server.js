const config = require("./config/config.js");
const app = require("./express.js");
const mongoose = require("mongoose");
const bidding = require("./controllers/bidding.controller.js");

mongoose.Promise = global.Promise;
mongoose.connect(
  config.mongoUri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to mongo")
);
mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

const server = app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${config.port}`);
});

bidding(server);
