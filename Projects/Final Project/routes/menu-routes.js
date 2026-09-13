const express = require("express");
const menuControllers = require("../controllers/menu-controllers");
const authenticateMiddleware = require("../middleware/authenticate-middleware");
const authorizeMiddleware = require("../middleware/authorize-middleware");

const router = express.Router();

router
  .route("/")
  .get(menuControllers.getAllMenuItems)
  .post(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    menuControllers.createMenuItem
  );

router
  .route("/:id")
  .get(menuControllers.getMenuItemById)
  .patch(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    menuControllers.updateMenuItem
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    menuControllers.deleteMenuItem
  );

module.exports = router;
