const db = require("../../DB/mysql");

function getAllError(res) {
  return db.getAllError(res);
}

function addError(res, error) {
  return db.addError(res, error);
}

function changeError(res, error) {
  return db.changeError(res, error);
}

function deleteError(res, id) {
  return db.deleteError(res, id);
}

module.exports = {
  getAllError,
  addError,
  changeError,
  deleteError,
};
