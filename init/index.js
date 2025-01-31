const initData = require("./data");
const mongoose = require("mongoose");
const Listing = require("../models/listing");

//connecting with mongodb
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const main = async () => {
  await mongoose.connect(MONGO_URL);
};

main()
  .then((res) => console.log("connected with db"))
  .catch((err) => console.log(err));

const init = async () => {
  //   await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
};
init().then(() => console.log("data initialization - done!"));
