const express = require("express");
const controlador = require("./controlador");

const router = express.Router();

router.get("/getAllTask", getAllTask);
router.post("/addTask", addTask);
router.post("/changeTask", changeTask);
router.post("/deleteTask", deleteTask);

//Call in PREDICTSNRVIEW
async function getAllTask(_, res, next) {
  try {
    await controlador.getAllTask(res);
  } catch (error) {
    next(error);
  }
}

//Call in PREDICTSNRVIEW
async function addTask(req, res, next) {
  const task = req.body;
  try {
    await controlador.addTask(res, task);
  } catch (error) {
    next(error);
  }
}

//Call in PREDICTSNRVIEW
async function changeTask(req, res, next) {
  const task = req.body;
  try {
    await controlador.changeTask(res, task);
  } catch (error) {
    next(error);
  }
}

//Call in PREDICTSNRVIEW
async function deleteTask(req, res, next) {
  const task = req.body;
  const id = task.id;
  try {
    await controlador.deleteTask(res, id);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
