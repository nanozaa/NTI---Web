const express = require("express");
const orderControllers = require("../controllers/order-controllers");
const authenticateMiddleware = require("../middleware/authenticate-middleware");
const authorizeMiddleware = require("../middleware/authorize-middleware");

const router = express.Router();

router.use(authenticateMiddleware);
router.post("/", orderControllers.createOrder);
router.get("/mine", authorizeMiddleware("student", "admin"), orderControllers.getMyOrders);
router.get("/", authorizeMiddleware("admin"), orderControllers.getAllOrders);
router.patch("/:id/status", authorizeMiddleware("admin"), orderControllers.updateOrderStatus);

module.exports = router;
