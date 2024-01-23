const mongoose = require("mongoose");
const config = require("config");
module.exports = () => {
  mongoose
    .connect(config.get("DataBase"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
    }).catch((err) => {
        console.log(err);
    });
};
