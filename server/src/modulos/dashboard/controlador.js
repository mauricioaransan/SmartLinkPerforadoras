const db = require("../../DB/mysql");

function getLastRXLVLandSNR(res) {
  return db.getLastRXLVLandSNR(res);
}

function getAllUsers(res) {
  return db.getAllUsers(res);
}

function getAllBandWidth(res) {
  return db.getAllBandWidth(res);
}

function getAllLatLngInfo(res) {
  return db.getAllLatLngInfo(res);
}

function getAlarmToDashBoard(res) {
  return db.getAlarmToDashBoard(res);
}

function getAlarmRecurrentToDashBoard(res) {
  return db.getAlarmRecurrentToDashBoard(res);
}

function getKPIDashboard(kpi, res) {
  return db.getKPIDashboard(kpi, res);
}

function getAllOperability(kpi, res) {
  return db.getAllOperability(kpi, res);
}

module.exports = {
  getAllBandWidth,
  getLastRXLVLandSNR,
  getAllLatLngInfo,
  getAlarmToDashBoard,
  getAllUsers,
  getKPIDashboard,
  getAllOperability,
  getAlarmRecurrentToDashBoard,
};
