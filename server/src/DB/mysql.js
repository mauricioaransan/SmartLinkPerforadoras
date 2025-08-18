// const transporter = require("../mail");
const mysql = require("mysql");
const config = require("../config");
const bcrypt = require("bcrypt");
const { createClient } = require("redis");
// const condi = require("../const/constantes");
const md5 = require("md5");
const { PythonShell } = require("python-shell");

// fecha BETWEEN ${DATEINI} AND ${DATEFIN}

const client = createClient({
  host: "127.0.0.1",
  port: 6379,
});

(async () => {
  await client.connect();
})();

client.on("connect", () => console.log("Redis Client Connected"));
client.on("error", (err) => console.log("Redis Client Connection Error", err));

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  connectionLimit: 20,
  queueLimit: 0,
};

let pool;

async function conecMySQL() {
  pool = mysql.createPool(dbConfig);
}
conecMySQL();

/*****************************************
 ***************** LOGIN *****************
 ****************************************/

async function userLogin(res, userLog) {
  const { email, password } = userLog;
  await pool.query(
    `SELECT * FROM users WHERE email = ?`,
    email,
    async (error, result) => {
      if (error) return console.log(error);
      if (result.length === 0) return res.json([{ user: "user", role: 999 }]);
      const isMatch = await bcrypt.compare(password, result[0].password);
      if (!isMatch) {
        return res.json([{ user: "pass", role: 999 }]);
      } else {
        return res.json([{ user: result[0].name, role: result[0].role }]);
      }
    }
  );
}
/*****************************************
 ***************** ERROR *****************
 ****************************************/

async function getAllError(res) {
  pool.query(`SELECT * FROM errors`, async (error, result) => {
    if (error) return console.log(error);
    res.json(result);
  });
}

async function addError(res, errors) {
  const { code, description, solution } = errors;
  pool.query(
    `INSERT INTO errors (code, description, solution) VALUES (?, ?, ?)`,
    [code, description, solution],
    async (error, result) => {
      if (error) return console.log(error);
      res.json(result);
    }
  );
}

async function changeError(res, errors) {
  const { id, code, description, solution } = errors;
  pool.query(
    `UPDATE errors SET code = ?, description = ?, solution = ? WHERE id = ?`,
    [code, description, solution, id],
    async (error, result) => {
      if (error) return console.log(error);
      res.json(result);
    }
  );
}

async function deleteError(res, id) {
  pool.query(`DELETE FROM errors WHERE id = ?`, id, async (error, result) => {
    if (error) return console.log(error);
    res.json(result);
  });
}

/*****************************************
 ***************** USERS *****************
 ****************************************/

async function getAllUser(res) {
  pool.query(`SELECT * FROM users`, async (error, result) => {
    if (error) return console.log(error);
    res.json(result);
  });
}

async function addUser(res, user) {
  const { name, role, email, status } = user;
  // const hashedPassword = await bcrypt.hash('miPassword123', 10);
  pool.query(
    `INSERT INTO users (name, role, email, password, status) VALUES (?, ?, ?, ?, ?)`,
    [name, role, email, "", status],
    async (error, result) => {
      if (error) return console.log(error);
      res.json(result);
    }
  );
}

async function changeUser(res, user) {
  const { id, name, role, email, status } = user;
  // const lastPassword = await bcrypt.hash(password, 10);
  pool.query(
    `UPDATE users SET name = ?, role = ?, email = ?, status = ? WHERE id = ?`,
    [name, role, email, status, id],
    async (error, result) => {
      if (error) return console.log(error);
      res.json(result);
    }
  );
}

async function deleteUser(res, id) {
  pool.query(`DELETE FROM users WHERE id = ?`, id, async (error, result) => {
    if (error) return console.log(error);
    res.json(result);
  });
}

async function changePassUser(res, user) {
  const { id, password } = user;
  const lastPassword = await bcrypt.hash(password, 10);
  pool.query(
    `UPDATE users SET password = ? WHERE id = ?`,
    [lastPassword, id],
    async (error, result) => {
      if (error) return console.log(error);
      res.json(result);
    }
  );
}

/*****************************************
 ***************** ROLE ******************
 ****************************************/

async function getAllRole(res) {
  pool.query(`SELECT * FROM rol_users`, async (error, result) => {
    if (error) return console.log(error);
    res.json(result);
  });
}

async function addRole(res, rol) {
  const { role } = rol;
  pool.query(
    `INSERT INTO rol_users (role) VALUES (?)`,
    [role],
    async (error, result) => {
      if (error) return console.log(error);
      res.json(result);
    }
  );
}

async function changeRole(res, rol) {
  const { id, role } = rol;
  pool.query(
    `UPDATE rol_users SET role = ? WHERE id = ?`,
    [role, id],
    async (error, result) => {
      if (error) return console.log(error);
      res.json(result);
    }
  );
}

async function deleteRole(res, id) {
  pool.query(
    `DELETE FROM rol_users WHERE id = ?`,
    id,
    async (error, result) => {
      if (error) return console.log(error);
      res.json(result);
    }
  );
}

/*****************************************
 ***************** TASKS *****************
 ****************************************/

async function getAllTask(res) {
  pool.query(`SELECT * FROM tasks`, async (error, result) => {
    if (error) return console.log(error);
    res.json(result);
  });
}

async function addTask(res, task) {
  const {
    description,
    device,
    status,
    assigned_to,
    alert,
    code,
    created_at,
    finished_at,
    comment,
  } = task;
  pool.query(
    `INSERT INTO tasks (description, device, status, assigned_to, alert, code, created_at, finished_at,comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      description,
      device,
      status,
      assigned_to,
      alert,
      code,
      created_at,
      finished_at,
      comment,
    ],
    async (error, result) => {
      if (error) return console.log(error);
      res.json(result);
    }
  );
}

async function changeTask(res, task) {
  const {
    id,
    description,
    device,
    status,
    assigned_to,
    alert,
    code,
    created_at,
    finished_at,
    comment,
  } = task;
  pool.query(
    `UPDATE tasks SET description = ?, device = ?, status = ?, assigned_to = ?, alert = ?, code = ?, created_at = ?, finished_at = ?, comment = ? WHERE id = ?`,
    [
      description,
      device,
      status,
      assigned_to,
      alert,
      code,
      created_at,
      finished_at,
      comment,
      id,
    ],
    async (error, result) => {
      if (error) return console.log(error);
      res.json(result);
    }
  );
}

async function deleteTask(res, id) {
  pool.query(`DELETE FROM tasks WHERE id = ?`, id, async (error, result) => {
    if (error) return console.log(error);
    res.json(result);
  });
}

module.exports = {
  userLogin,

  getAllError,
  addError,
  changeError,
  deleteError,

  getAllUser,
  addUser,
  changeUser,
  deleteUser,
  changePassUser,

  getAllRole,
  addRole,
  changeRole,
  deleteRole,

  getAllTask,
  addTask,
  changeTask,
  deleteTask,
};
