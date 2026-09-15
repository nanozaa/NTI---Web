const Reservation = require("../models/reservation-model");
const User = require("../models/user-model");

const createReservation = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const reservation = await Reservation.create({
      ...req.body,
      user: req.userId,
      name: req.body.name || `${user.firstName} ${user.lastName}`,
      email: req.body.email || user.email,
    });
    res.status(201).json({ status: "success", data: { reservation } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getMyReservations = async (req, res) => {
  const reservations = await Reservation.find({ user: req.userId }).sort({ date: 1 });
  res.status(200).json({ status: "success", data: { reservations } });
};

const getAllReservations = async (req, res) => {
  const reservations = await Reservation.find().populate("user", "firstName lastName email").sort({ date: 1 });
  res.status(200).json({ status: "success", count: reservations.length, data: { reservations } });
};

const updateReservationStatus = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { returnDocument: "after", runValidators: true }
    ).populate("user", "firstName lastName email");
    if (!reservation) return res.status(404).json({ status: "fail", message: "Reservation not found" });
    res.status(200).json({ status: "success", data: { reservation } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { createReservation, getMyReservations, getAllReservations, updateReservationStatus };