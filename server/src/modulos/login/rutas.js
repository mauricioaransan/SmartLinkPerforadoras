const express = require("express");
const controlador = require("./controlador");

const router = express.Router();

router.post("/userLogin", userLogin);

//Call in PREDICTSNRVIEW
async function userLogin(req, res, next) {
  const user = req.body;
  try {
    await controlador.userLogin(res, user);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
