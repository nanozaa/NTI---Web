const express = require("express");
const controllers = require("../controllers/reservation-controllers");
const authenticate = require("../middleware/authenticate-middleware");
const authorize = require("../middleware/authorize-middleware");

const router = express.Router();
router.use(authenticate);
router.post("/", controllers.createReservation);
router.get("/mine", controllers.getMyReservations);
router.get("/", authorize("admin"), controllers.getAllReservations);
router.patch("/:id/status", authorize("admin"), controllers.updateReservationStatus);

module.exports = router;