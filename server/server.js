require("dotenv").config();
const app = require("./express.js");
const mongoose = require("mongoose");
const server = require("http").createServer(app);
const bidding = require("./controllers/bidding.controller");

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_LOCAL_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("Connected to mongo")
);
mongoose.connection.on("error", () => {
  throw new Error(
    `Unable to connect to database: ${process.env.MONGODB_LOCAL_URI}`
  );
});

server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${process.env.PORT}`);
});
bidding(server);
