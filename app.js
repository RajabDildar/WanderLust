if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const sessionConfig = require("./utils/sessionConfig.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

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
const dbUrl = process.env.ATLASDB_URL;

const main = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true, // Required for new connection string parser
      useUnifiedTopology: true, // Required for new server discovery engine
      tls: true, // Enforce TLS/SSL
      serverSelectionTimeoutMS: 5000, // Fail fast if no connection
    });

    console.log("Connected to DB");
    const port = process.env.PORT || 3000;
    app.listen(port, "0.0.0.0", () =>
      console.log(`Server running on port ${port}`)
    );
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
};

main();

sessionConfig.store.on("error", (err) => {
  console.log("Mongo Session Store Error:", err);
});

app.use(session(sessionConfig.sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//creating routes
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});
