const express = require("express");
const controlador = require("./controlador");

const router = express.Router();

router.get("/getAllError", getAllError);
router.post("/addError", addError);
router.post("/changeError", changeError);
router.post("/deleteError", deleteError);

async function getAllError(_, res, next) {
  try {
    await controlador.getAllError(res);
  } catch (error) {
    next(error);
  }
}

async function addError(req, res, next) {
  const error = req.body;
  try {
    await controlador.addError(res, error);
  } catch (error) {
    next(error);
  }
}

async function changeError(req, res, next) {
  const error = req.body;
  try {
    await controlador.changeError(res, error);
  } catch (error) {
    next(error);
  }
}

async function deleteError(req, res, next) {
  const { id } = req.body;
  try {
    await controlador.deleteError(res, id);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
