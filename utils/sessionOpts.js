//session and flash (must be wriitten before routes)
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //this will tell how long to keep user logged in (depending upon last login on site).
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 * 24 * 60 * 60 * 1000 = milliseconds in 7 days
    httpOnly: true, //this is for security purposes, (for cross scipting attacks).
  },
};

module.exports = sessionOptions;
