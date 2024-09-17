// DO YOUR MAGIC
// get
// get by id
//post
const express = require("express");
const carsModel = require("./cars-model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const cars = await carsModel.getAll();
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await carsModel.getById(id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newCar = carsModel.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    next(err);
  }
});
