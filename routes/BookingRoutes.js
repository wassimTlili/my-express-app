const express = require("express");

const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/BookingController");

const router = express.Router();

router.route("/bookings").get(getBookings).post(createBooking);
router.route("/bookings/:id").get(getBookingById).patch(updateBooking).delete(deleteBooking);

module.exports = router;
