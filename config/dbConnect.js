const { default: mongoose } = require("mongoose");

function dbConnect() {
  console.log("Connecting...");
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("DataBase is connected successful");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = dbConnect;
