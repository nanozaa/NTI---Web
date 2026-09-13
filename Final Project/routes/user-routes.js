const express = require("express");
const userControllers = require("../controllers/user-controllers");
const authenticateMiddleware = require("../middleware/authenticate-middleware");
const authorizeMiddleware = require("../middleware/authorize-middleware");

const router = express.Router();

router
  .route("/menu")
  .get(
    authenticateMiddleware,
    authorizeMiddleware("student"),
    userControllers.getUserMenuItems
  )
  .post(
    authenticateMiddleware,
    authorizeMiddleware("student"),
    userControllers.addMenuItemToUser
  );

module.exports = router;
