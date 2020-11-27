import config from "./config/config.js";
import app from "./express.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connect(
  config.mongoUri_remote,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to mongo")
);
mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect to database: ${config.mongoUri_remote}`);
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${config.port}`);
});
