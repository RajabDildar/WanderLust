const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews");

//setting ejs as view engine and setting ejs-mate
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);

//parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static files path
app.use(express.static(path.join(__dirname, "/public")));

//method overriding
app.use(methodOverride("_method"));

//connecting with mongodb
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const main = async () => {
  await mongoose.connect(MONGO_URL);
};

main()
  .then((res) => console.log("connected with db"))
  .catch((err) => console.log(err));

//routes
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

//starting server
app.listen(3000, () => console.log("server is listening"));
