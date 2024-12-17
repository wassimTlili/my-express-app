const Car = require("../models/Car")
const APIFeatures = require("../utils/APIFeatures")

const createCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body);

    res.status(201).json({
      status: "success",
      data: newCar,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getCars = async (req, res) => {
  try {
    const features = new APIFeatures(Car.find(), req.query)
      .filter()
      .sort()
      .paginate();

    const cars = await features.query;
    res.status(200).json({
      status: 'success',
      results: cars.length,
      data: cars,
    });
  } catch (error) {
    res.status(400).json({ 
      status: 'fail',
       error: error.message });
  }
};

const getCarById = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({
      status: "success",
      data: car,
    });
  } catch (error) {
    res.status(400).json({ 
      status: "fail",
      message: error.message
       });
  }
};

const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id,req.body,{ new: true });
    if (!updatedCar) return res.status(404).json({ message: "Car not found" });
    res.status(203).json({
      status:'success',
      data: {updatedCar},
  })  } catch (error) {
    res.status(400).json({
      status:'fail',
      message:error.message,
  })  }
};

const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: "Car not found" });
    res.status(204).json({
      status:'success',
      message: 'Car deleted successfully',
  })  } catch (error) {
    res.status(400).json({
      status:'fail',
      message:error.message,
  })  }
};

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
};
