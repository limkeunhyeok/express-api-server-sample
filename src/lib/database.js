const mongoose = require("mongoose");

function connect() {
  mongoose.connection
    .on("error", console.log)
    .on('disconnected', connect);
  return mongoose.connect({
    dbName: "Express-API",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connect;