const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.renderSignupPage)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginPage)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.afterLogin)
  );

router.get("/logout", userController.logout);

module.exports = router;
