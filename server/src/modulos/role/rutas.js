const express = require("express");
const controlador = require("./controlador");

const router = express.Router();

router.get("/getAllRole", getAllRole);
router.post("/addRole", addRole);
router.post("/changeRole", changeRole);
router.post("/deleteRole", deleteRole);

//Call in PREDICTSNRVIEW
async function getAllRole(_, res, next) {
  try {
    await controlador.getAllRole(res);
  } catch (error) {
    next(error);
  }
}

//Call in PREDICTSNRVIEW
async function addRole(req, res, next) {
  const user = req.body;
  try {
    await controlador.addRole(res, user);
  } catch (error) {
    next(error);
  }
}

//Call in PREDICTSNRVIEW
async function changeRole(req, res, next) {
  const user = req.body;
  try {
    await controlador.changeRole(res, user);
  } catch (error) {
    next(error);
  }
}

//Call in PREDICTSNRVIEW
async function deleteRole(req, res, next) {
  const user = req.body;
  const id = user.id;
  try {
    await controlador.deleteRole(res, id);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
