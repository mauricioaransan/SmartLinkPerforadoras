const express = require("express");
const respuesta = require("../../red/respuestas");
const { PythonShell } = require("python-shell");
const axios = require("axios");
const controlador = require("./controlador");

const router = express.Router();

router.get("/geAllIPDrive", geAllIPDrive);
router.get("/getInfoDriveByIP", getInfoDriveByIP);
router.get("/postHeatMap", postHeatMap);
router.get("/geAllIPDriveRajant", geAllIPDriveRajant);
router.get("/getInfoDriveRajantByIP", getInfoDriveRajantByIP);
router.get("/postHeatMapRAJANT", postHeatMapRAJANT);
router.get("/killProcessBandWidth", killProcessBandWidth);
router.get("/postBandWidth", postBandWidth);
router.get("/getRajantPerfomance", getRajantPerfomance);
router.get("/getRajantGPS", getRajantGPS);
router.get("/getRajantIPS", getRajantIPS);

async function geAllIPDrive(req, res, next) {
  try {
    const respuestaAPI = await axios.get(
      "http://192.168.2.154:8000/drive/LTE/"
    );
    let finalDATA = "";
    finalDATA = respuestaAPI.data;
    await respuesta.success(req, res, finalDATA, 200);
  } catch (error) {
    console.error("Error al obtener la data:", error.message);
  }
}
async function getInfoDriveByIP(req, res, next) {
  let getIP = req.query.ip;
  try {
    const respuestaAPI = await axios.get(
      `http://192.168.2.154:8000/drive/LTE/${getIP}`
    );
    finalDATA = respuestaAPI.data;
    await respuesta.success(req, res, finalDATA, 200);
  } catch (error) {
    console.error("Error al obtener la data:", error.message);
  }
}
async function postHeatMap(req, res, next) {
  const { minutes, interval } = req.query;
  try {
    let items = [];
    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      scriptPath: "/usr/smartlink/heatmap/",
      args: [minutes, interval],
    };

    try {
      await PythonShell.run("dataRajant.py", options).then((messages) => {
        items = messages;
      });

      await respuesta.success(req, res, items, 200);
    } catch (error) {
      respuesta.error(req, res, "Error en el Python: " + error, 400);
    }
  } catch (error) {
    respuesta.error(req, res, "Error en el Python: " + error, 400);
  }
}

async function postHeatMapRAJANT(req, res, next) {
  const { minutes, interval } = req.query;
  try {
    let items = [];
    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      scriptPath: "/usr/smartlink/heatmap/",
      args: [minutes, interval],
    };

    try {
      await PythonShell.run("dataRajant.py", options).then((messages) => {
        items = messages;
      });

      await respuesta.success(req, res, items, 200);
    } catch (error) {
      respuesta.error(req, res, "Error en el Python: " + error, 400);
    }
  } catch (error) {
    respuesta.error(req, res, "Error en el Python: " + error, 400);
  }
}

async function geAllIPDriveRajant(req, res, next) {
  try {
    const respuestaAPI = await axios.get(
      "http://192.168.2.154:8000/drive/Rajant/"
    );
    let finalDATA = "";
    finalDATA = respuestaAPI.data;
    await respuesta.success(req, res, finalDATA, 200);
  } catch (error) {
    console.error("Error al obtener la data:", error.message);
  }
}
async function getInfoDriveRajantByIP(req, res, next) {
  // let getIP = req.query.ip;
  const { ip } = req.query;
  try {
    const respuestaAPI = await axios.get(
      `http://192.168.2.154:8000/drive/Rajant/${ip}`
    );
    finalDATA = respuestaAPI.data;
    await respuesta.success(req, res, finalDATA, 200);
  } catch (error) {
    console.error("Error al obtener la data:", error.message);
  }
}

async function killProcessBandWidth(req, res, next) {
  // const { ip, seconds, minval } = req.query;
  try {
    let items = [];
    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      scriptPath: "/usr/smartlink/rajant/",
      // args: ["-d", "-i", ip, "-t", seconds, "-b", minval],
    };

    try {
      await PythonShell.run("iperf3_terminate.py", options).then((messages) => {
        items = messages;
      });

      await respuesta.success(req, res, items, 200);
    } catch (error) {
      respuesta.error(req, res, "Error en el Python: " + error, 400);
    }
  } catch (error) {
    respuesta.error(req, res, "Error en el Python: " + error, 400);
  }
}

async function postBandWidth(req, res, next) {
  const { ip, seconds, minval } = req.query;
  try {
    let items = [];
    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      scriptPath: "/usr/smartlink/rajant/",
      args: ["-d", "-i", ip, "-t", seconds, "-b", minval],
    };

    try {
      await PythonShell.run("iperf3_update.py", options).then((messages) => {
        items = messages;
      });

      await respuesta.success(req, res, items, 200);
    } catch (error) {
      respuesta.error(req, res, "Error en el Python: " + error, 400);
    }
  } catch (error) {
    respuesta.error(req, res, "Error en el Python: " + error, 400);
  }
}

async function getRajantPerfomance(req, res, next) {
  try {
    await controlador.getRajantPerfomance(res);
  } catch (error) {
    next(error);
  }
}

async function getRajantGPS(req, res, next) {
  try {
    await controlador.getRajantGPS(res);
  } catch (error) {
    next(error);
  }
}

async function getRajantIPS(req, res, next) {
  try {
    await controlador.getRajantIPS(res);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
