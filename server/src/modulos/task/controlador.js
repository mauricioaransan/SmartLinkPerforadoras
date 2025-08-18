const db = require("../../DB/mysql");

function getAllTask(res) {
  return db.getAllTask(res);
}

function addTask(res, task) {
  return db.addTask(res, task);
}

function changeTask(res, task) {
  return db.changeTask(res, task);
}

function deleteTask(res, id) {
  return db.deleteTask(res, id);
}

module.exports = {
  getAllTask,
  addTask,
  changeTask,
  deleteTask,
};
