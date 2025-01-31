const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing");
const ejsMate = require("ejs-mate");

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

//creating routes
app.get("/", (req, res) => {
  res.redirect("/listings");
});

//home route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//new route
app.get("/listings/new", async (req, res) => {
  res.render("listings/new.ejs");
});

//create route
app.post("/listings", async (req, res) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { runValidators: true }
  );
  res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

//starting server
app.listen(3000, () => console.log("server is listening"));
