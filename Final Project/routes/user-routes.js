const express = require("express");
const userControllers = require("../controllers/user-controllers");
const authenticateMiddleware = require("../middleware/authenticate-middleware");
const authorizeMiddleware = require("../middleware/authorize-middleware");
const multerUpload = require("../middleware/multer-middleware");

const router = express.Router();

router.get("/profile", authenticateMiddleware, userControllers.getProfile);
router.patch("/profile", authenticateMiddleware, multerUpload.single("image"), userControllers.updateProfile);

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
