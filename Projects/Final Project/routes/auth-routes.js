const express = require("express");
const authControllers = require("../controllers/auth-controllers");
const multerUpload = require("../middleware/multer-middleware");

const router = express.Router();

router.post("/signup", multerUpload.single("imageUrl"), authControllers.signup);
router.post("/signin", authControllers.signin);

module.exports = router;
