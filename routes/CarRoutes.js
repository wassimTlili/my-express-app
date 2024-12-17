const express = require("express");
const {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} = require("../controllers/CarController");

const router = express.Router();



router.route("/cars").post(createCar).get(getCars);
router.route("/cars/:id").get(getCarById).patch(updateCar).delete(deleteCar);

module.exports = router;
