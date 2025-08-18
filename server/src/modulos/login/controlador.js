const db = require("../../DB/mysql");

function userLogin(res, user) {
  return db.userLogin(res, user);
}

module.exports = {
  userLogin,
};
