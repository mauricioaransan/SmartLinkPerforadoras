const express = require("express");

const controlador = require("./controlador");

const router = express.Router();

router.get("/getAllLatLngInfo", getAllLatLngInfo);
router.get("/getAllBandWidth", getAllBandWidth);
router.get("/getAlarmToDashBoard", getAlarmToDashBoard);
router.get("/getAllUsers", getAllUsers);
router.get("/getLastRXLVLandSNR", getLastRXLVLandSNR);
router.get("/getAlarmRecurrentToDashBoard", getAlarmRecurrentToDashBoard);
router.get("/getKPIDashboard", getKPIDashboard);
router.get("/getAllOperability", getAllOperability);

async function getAllBandWidth(req, res, next) {
  try {
    await controlador.getAllBandWidth(res);
  } catch (error) {
    next(error);
  }
}

async function getLastRXLVLandSNR(req, res, next) {
  try {
    await controlador.getLastRXLVLandSNR(res);
  } catch (error) {
    next(error);
  }
}

async function getAllLatLngInfo(req, res, next) {
  try {
    await controlador.getAllLatLngInfo(res);
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(req, res, next) {
  try {
    await controlador.getAllUsers(res);
  } catch (error) {
    next(error);
  }
}

async function getAlarmToDashBoard(req, res, next) {
  try {
    await controlador.getAlarmToDashBoard(res);
  } catch (error) {
    next(error);
  }
}

async function getAlarmRecurrentToDashBoard(req, res, next) {
  try {
    await controlador.getAlarmRecurrentToDashBoard(res);
  } catch (error) {
    next(error);
  }
}

async function getAllOperability(req, res, next) {
  try {
    await controlador.getAllOperability(res);
  } catch (error) {
    next(error);
  }
}

async function getKPIDashboard(req, res, next) {
  try {
    await controlador.getKPIDashboard(req.query.kpi, res);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
