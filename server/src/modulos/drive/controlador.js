const db = require("../../DB/mysql");

function getRajantPerfomance(res) {
  return db.getRajantPerfomance(res);
}

function getRajantGPS(res) {
  return db.getRajantGPS(res);
}

function getRajantIPS(res) {
  return db.getRajantIPS(res);
}

module.exports = {
  getRajantPerfomance,
  getRajantGPS,
  getRajantIPS,
};
