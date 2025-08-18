const express = require("express");
const controlador = require("./controlador");

const router = express.Router();

router.get("/getAllUser", getAllUser);
router.post("/addUser", addUser);
router.post("/changeUser", changeUser);
router.post("/deleteUser", deleteUser);
router.post("/changePassUser", changePassUser);

async function getAllUser(_, res, next) {
  try {
    await controlador.getAllUser(res);
  } catch (error) {
    next(error);
  }
}

async function addUser(req, res, next) {
  const user = req.body;
  try {
    await controlador.addUser(res, user);
  } catch (error) {
    next(error);
  }
}

async function changeUser(req, res, next) {
  const user = req.body;
  try {
    await controlador.changeUser(res, user);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const user = req.body;
  const id = user.id;
  try {
    await controlador.deleteUser(res, id);
  } catch (error) {
    next(error);
  }
}

async function changePassUser(req, res, next) {
  const user = req.body;
  try {
    await controlador.changePassUser(res, user);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
