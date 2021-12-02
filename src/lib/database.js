const mongoose = require("mongoose");

function connect() {
  mongoose.connect(process.env.DB_URL, {
    dbName: "Express-API",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .on("error", console.log)
    .on('disconnected', connect);
}

module.exports = connect