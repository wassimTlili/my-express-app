const Booking = require("../models/Booking");
const APIFeatures = require("../utils/APIFeatures");

const createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({
      status: "success",
      data: newBooking,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const features = new APIFeatures(
      Booking.find().populate("userId").populate("carId"),
      req.query
    )
      .filter()
      .sort()
      .paginate();

    const bookings = await features.query;
    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId")
      .populate("carId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({
      status: "success",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.pqrqms.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found" });
    res.status(203).json({
      status: "success",
      data: { updatedBooking },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking)
      return res.status(404).json({ message: "Booking not found" });
    res.status(204).json({
      status: "success",
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
