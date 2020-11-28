module.exports = (server) => {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    socket.on("join auction room", (data) => {
      socket.join(data.room);
    });

    socket.on("leave auction room", (data) => {
      socket.leave(data.room);
    });
  });
};
