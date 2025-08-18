const db = require("../../DB/mysql");

function getAllRole(res) {
  return db.getAllRole(res);
}

function addRole(res, rol) {
  return db.addRole(res, rol);
}

function changeRole(res, rol) {
  return db.changeRole(res, rol);
}

function deleteRole(res, id) {
  return db.deleteRole(res, id);
}

module.exports = {
  getAllRole,
  addRole,
  changeRole,
  deleteRole,
};
