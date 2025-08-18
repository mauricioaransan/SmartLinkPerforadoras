const db = require("../../DB/mysql");

function getAllUser(res) {
  return db.getAllUser(res);
}

function addUser(res, user) {
  return db.addUser(res, user);
}

function changeUser(res, user) {
  return db.changeUser(res, user);
}

function deleteUser(res, id) {
  return db.deleteUser(res, id);
}

function changePassUser(res, user) {
  return db.changePassUser(res, user);
}

module.exports = {
  getAllUser,
  addUser,
  changeUser,
  deleteUser,
  changePassUser,
};
