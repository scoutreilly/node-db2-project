const db = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  return db("cars");
};

const getById = async (id) => {
  // DO YOUR MAGIC
  const result = await db("cars").where("id", id).first();
  return result;
};

const create = async (car) => {
  // DO YOUR MAGIC
  const [id] = await db("cars").insert(car);
  return getById(id);
};
module.exports = { getAll, getById, create };
