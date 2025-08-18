const express = require("express");
const morgan = require("morgan");
// const fs = require("fs");
// const https = require("https");
// const http = require("http");

// PUERTOS
// const HTTP_PORT = 8970;
// const HTTPS_PORT = 4150;
const MYSQL_PORT = 6958;

const bodyParser = require("body-parser");

const login = require("./modulos/login/rutas");
const error = require("./modulos/error/rutas");
const users = require("./modulos/users/rutas");
const role = require("./modulos/role/rutas");
const task = require("./modulos/task/rutas");

const app = express();

app.use(bodyParser.json({ limit: "500kb" }));

//Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Transfer-Encoding", "chunked");
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion
app.set("port", MYSQL_PORT);

//rutas
app.use("/api/error", error);
app.use("/api/user", users);
app.use("/api/role", role);
app.use("/api/task", task);
app.use("/api/login", login);

// para hacerlo HTTPS

// const privateKey = fs.readFileSync("/etc/apache2/ssl/server.key", "utf8");
// const certificate = fs.readFileSync("/etc/apache2/ssl/server.crt", "utf8");

// const credentials = {
//   key: privateKey,
//   cert: certificate,
// };

// const httpsServer = https.createServer(credentials, app);

// const httpServer = http.createServer((req, res) => {
//   res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
//   res.end();
// });

// httpServer.listen(HTTP_PORT, () => {
//   console.log(`Servidor HTTP redirigiendo a HTTPS en el puerto ${HTTP_PORT}`);
// });

// httpsServer.listen(HTTPS_PORT, () => {
//   console.log(`Servidor HTTPS corriendo en el puerto ${HTTPS_PORT}`);
// });

module.exports = app;
