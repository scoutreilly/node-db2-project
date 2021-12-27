const carsModel = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const { id } = req.params;
    const car = await carsModel.getById(id);
    if (!car) {
      res.status(404).json(`car with id ${id} could not be found`);
    } else {
      res.json(car);
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const body = req.body;
    if (!body.name) {
      res.status(400).json({ message: "name is missing" });
    } else if (!body.vin) {
      res.status(400).json({ message: "vin is missing" });
    } else if (!body.make) {
      res.status(400).json({ message: "make is missing" });
    } else if (!body.model) {
      res.status(400).json({ message: "model is missing" });
    } else if (!body.milage) {
      res.status(400).json({ message: "milage is missing" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const vin = req.body.vin;
    if (!vin) {
      res.status(400).json(`vin ${vin} is invalid`);
      next();
    } else {
      vinValidator.validate(vin);
    }
  } catch (err) {
    next(err);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const vin = req.body.vin;
    const existingVin = await carsModel.getByVin(vin);
    if (!existingVin) {
      next();
    } else {
      res.status(400).json(`vin ${vin} already exist`);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
