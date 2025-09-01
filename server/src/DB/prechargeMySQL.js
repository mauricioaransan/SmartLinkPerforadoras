const mysql = require("mysql");
const config = require("../config");
const condi = require("../const/constantes");
const { createClient } = require("redis");

const client = createClient({
  host: "127.0.0.1",
  port: 6379,
});

(async () => {
  await client.connect();
})();

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  connectionLimit: 20, // Número máximo de conexiones en el pool
  queueLimit: 0, //
};

let conexion;

async function conecMySQL() {
  conexion = mysql.createPool(dbConfig);
}

conecMySQL();

async function preChargeDataKPI(query) {
  let queryFinal = condi.SELECT_QUERY[query] || "SELECT * FROM inventario";

  conexion.query(`${queryFinal}`, async (error, result) => {
    if (error) return console.log(error);

    await client.set(query, JSON.stringify(result));
    await client.expire(query, 3600);
  });
}

async function getKPIDashboard(query) {
  let queryFinal =
    condi.KPI_QUERYS_LAST_TIME[query] || "SELECT * FROM inventario";

  conexion.query(`${queryFinal}`, async (error, result) => {
    if (error) return console.log(error);

    await client.set("kpidashboard-" + query, JSON.stringify(result));
    if (query === "quality_lap") {
      client.set("kpidashboard-kpisnr", JSON.stringify(result));
    }
  });
}

async function getAllLatLngInfo() {
  conexion.query(
    `SELECT a.ip, DATE_FORMAT(a.fecha, '%Y-%m-%d %H:%i:00') as fecha,  a.latitud, a.longitud
    FROM ubicacion_gps a
    WHERE a.fecha > Now() - INTERVAL 1 MINUTE
    ORDER BY a.fecha DESC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("getAllLatLngInfo", JSON.stringify(result));
    }
  );
}

async function getAllLatLngRAJANT() {
  conexion.query(
    `SELECT a.ip, b.tag AS name, b.tipo, DATE_FORMAT(a.fecha, '%Y-%m-%d %H:%i:00') as fecha,  a.latitud, a.longitud
    FROM ubicacion_gps a INNER JOIN inventario b ON a.ip = b.ip 
    WHERE a.fecha > Now() - INTERVAL 1 MINUTE AND UPPER(b.marca) like '%RAJANT%'
    ORDER BY a.fecha DESC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("LatLngRAJANT", JSON.stringify(result));
    }
  );
}

async function getAllLatLngPMPSM() {
  conexion.query(
    `SELECT b.ip, b.tag AS name, b.tipo, -12.1093 AS latitud, -76.974 AS longitud, b.anotacion
    FROM inventario b
    WHERE UPPER(b.tipo) = 'PMP-SM'`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("LatLngPMPSM", JSON.stringify(result));
    }
  );
}

async function getAllTopologyData() {
  conexion.query(
    `SELECT a.ip, a.tag AS name, a.marca, a.tipo, a.rol AS subtipo, 
    CASE 
      WHEN b.latencia >= 0 AND b.latencia < 100 AND b.fecha >= NOW() - INTERVAL 1 MINUTE THEN 'ok'
      WHEN b.latencia >= 100 AND b.latencia < 200 AND b.fecha >= NOW() - INTERVAL 1 MINUTE THEN 'alert'
      WHEN b.latencia >= 200 AND b.fecha >= NOW() - INTERVAL 1 MINUTE THEN 'alarm'
      WHEN b.latencia = -1 AND b.fecha >= NOW() - INTERVAL 1 MINUTE THEN 'down'
      ELSE 'downs'
    END AS status
    FROM latencia b INNER JOIN inventario a ON a.ip = b.ip AND b.fecha >= NOW() - INTERVAL 1 MINUTE
    GROUP BY 1,2,3,4,5,6; `,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("topologystatus", JSON.stringify(result));
    }
  );
}

async function getClientStatusData() {
  conexion.query(
    `SELECT a.ip, a.tag AS name, a.marca, a.tipo, a.rol AS subtipo,b.latencia, DATE_FORMAT(b.fecha, '%Y-%m-%d %H:%i:00') AS fecha 
    FROM latencia b INNER JOIN inventario a ON a.ip = b.ip AND DATE_FORMAT(b.fecha, '%Y-%m-%d %H:%i:00') >= NOW() - INTERVAL 1 MINUTE 
    GROUP BY 1,2,3,4,5,6
    ORDER BY name; `,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("clientstatus", JSON.stringify(result));
    }
  );
}

async function getAllPredictRXLVLData() {
  conexion.query(
    `SELECT a.ip, b.tag AS name, b.marca, b.tipo, b.rol AS subtipo, 'predict' AS status 
    FROM predicciones a INNER JOIN inventario b ON a.ip = b.ip 
    WHERE tipo_prediccion LIKE '%RX%'
    GROUP BY 1,2,3,4,5,6;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("allPredictData", JSON.stringify(result));
    }
  );
}

async function getAllSNRData() {
  await conexion.query(
    `SELECT DATE_FORMAT(a.fecha,'%Y-%m-%d %H:%i:00') AS fecha, a.ip, c.latitud, c.longitud, a.network AS snr, b.tag AS name, b.tipo 
    FROM cambium_data a 
    INNER JOIN inventario b ON a.ip = b.ip 
    INNER JOIN ubicacion_gps c ON a.ip = c.ip 
    WHERE a.fecha >= Now() - INTERVAL 180 MINUTE - INTERVAL 2 HOUR AND DATE_FORMAT(a.fecha,'%Y-%m-%d %H:%i:00') = DATE_FORMAT(c.fecha,'%Y-%m-%d %H:%i:00');`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("AllSNRData", JSON.stringify(result));
    }
  );
}

async function getAllRajantDataLastMinute() {
  await conexion.query(
    `SELECT a.ip, DATE_FORMAT(a.fecha,'%Y-%m-%d %H:%i:00') AS fecha, a.wireless, a.wired, b.tag AS name, b.tipo, c.valores 
    FROM rajant_data a 
    INNER JOIN inventario b ON a.ip = b.ip 
    INNER JOIN sensores c ON a.ip = c.ip
    WHERE a.fecha >= NOW() - INTERVAL 15 MINUTE - INTERVAL 2 HOUR AND DATE_FORMAT(a.fecha,'%Y-%m-%d %H:%i:00') = DATE_FORMAT(c.fecha,'%Y-%m-%d %H:%i:00')
    ORDER BY a.fecha DESC, a.ip DESC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("AllRajantDataLastMinute", JSON.stringify(result));
    }
  );
}
async function getAllWirelessData() {
  await conexion.query(
    `SELECT a.ip, DATE_FORMAT(a.fecha,'%Y-%m-%d %H:%i:00') AS fecha, a.wireless, b.tag AS name, b.tipo 
    FROM rajant_data a INNER JOIN inventario b ON a.ip = b.ip 
    WHERE a.fecha >= NOW() - INTERVAL 1 DAY - INTERVAL 2 HOUR 
    ORDER BY a.fecha DESC, a.ip DESC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("AllWirelessData", JSON.stringify(result));
    }
  );
}

async function getAllWiredData() {
  await conexion.query(
    `SELECT a.ip, DATE_FORMAT(a.fecha,'%Y-%m-%d %H:%i:00') AS fecha, a.wired, b.tag AS name, b.tipo 
    FROM rajant_data a INNER JOIN inventario b ON a.ip = b.ip 
    WHERE a.fecha >= NOW() - INTERVAL 1 DAY - INTERVAL 2 HOUR
    ORDER BY a.fecha DESC, a.ip DESC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("AllWiredData", JSON.stringify(result));
    }
  );
}

async function getAllTempData() {
  await conexion.query(
    `SELECT DATE_FORMAT(a.fecha, '%Y-%m-%d %H:%i:00') as fecha, a.ip, a.valores
    FROM sensores a
    WHERE a.fecha >= NOW() - INTERVAL 360 MINUTE - INTERVAL 2 HOUR
    ORDER BY a.fecha DESC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("AllTempData", JSON.stringify(result));
    }
  );
}

async function getAllCostData() {
  await conexion.query(
    `SELECT a.ip, DATE_FORMAT(a.fecha,'%Y-%m-%d %H:%i:00') AS fecha, a.wired, b.tag AS name, b.tipo 
    FROM rajant_data a INNER JOIN inventario b ON a.ip = b.ip 
    WHERE a.fecha >= NOW() - INTERVAL 1 DAY - INTERVAL 2 HOUR
    ORDER BY a.fecha DESC, a.ip DESC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("AllCostData", JSON.stringify(result));
    }
  );
}

async function getAllCostJRData() {
  await conexion.query(
    `SELECT a.ip, DATE_FORMAT(a.fecha,'%Y-%m-%d %H:%i:00') AS fecha, a.wireless, b.tag AS name, b.tipo 
    FROM rajant_data a INNER JOIN inventario b ON a.ip = b.ip 
    WHERE a.fecha >= NOW() - INTERVAL 1 DAY - INTERVAL 2 HOUR
    ORDER BY a.fecha DESC, a.ip DESC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("AllCostJRData", JSON.stringify(result));
    }
  );
}

async function getDataBaseStatus() {
  conexion.query(
    `SELECT 
    (SELECT CASE WHEN fecha = null THEN 0 ELSE 1 END AS valor FROM cambium_data WHERE fecha >= NOW() - INTERVAL 15 MINUTE - INTERVAL 2 HOUR ORDER BY fecha DESC LIMIT 1) AS cambium_data, 
    (SELECT CASE WHEN fecha = null THEN 0 ELSE 1 END AS valor FROM eventos WHERE fecha >= NOW() - INTERVAL 15 MINUTE - INTERVAL 2 HOUR ORDER BY fecha DESC LIMIT 1) AS eventos,
    (SELECT CASE WHEN fecha = null THEN 0 ELSE 1 END AS valor FROM latencia WHERE fecha >= NOW() - INTERVAL 15 MINUTE - INTERVAL 2 HOUR ORDER BY fecha DESC LIMIT 1) AS latencia,
    (SELECT CASE WHEN fecha = null THEN 0 ELSE 1 END AS valor FROM LTE_data WHERE fecha >= NOW() - INTERVAL 15 MINUTE - INTERVAL 2 HOUR ORDER BY fecha DESC LIMIT 1) AS LTE_data,
    (SELECT CASE WHEN fecha = null THEN 0 ELSE 1 END AS valor FROM predicciones WHERE fecha >= NOW() - INTERVAL 15 MINUTE - INTERVAL 2 HOUR ORDER BY fecha DESC LIMIT 1) AS predicciones,
    (SELECT CASE WHEN fecha = null THEN 0 ELSE 1 END AS valor FROM rajant_data WHERE fecha >= NOW() - INTERVAL 15 MINUTE - INTERVAL 2 HOUR ORDER BY fecha DESC LIMIT 1) AS rajant_data,
    (SELECT CASE WHEN fecha = null THEN 0 ELSE 1 END AS valor FROM sensores WHERE fecha >= NOW() - INTERVAL 15 MINUTE - INTERVAL 2 HOUR ORDER BY fecha DESC LIMIT 1) AS sensores,
    (SELECT CASE WHEN fecha = null THEN 0 ELSE 1 END AS valor FROM servidor_data WHERE fecha >= NOW() - INTERVAL 15 MINUTE - INTERVAL 2 HOUR ORDER BY fecha DESC LIMIT 1) AS servidor_data,
    (SELECT CASE WHEN fecha = null THEN 0 ELSE 1 END AS valor FROM ubicacion_gps WHERE fecha >= NOW() - INTERVAL 15 MINUTE - INTERVAL 2 HOUR ORDER BY fecha DESC LIMIT 1) AS ubicacion_gps
    FROM inventario LIMIT 1;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("dataBaseStatus", JSON.stringify(result));
    }
  );
}

async function getCostWiredpeers() {
  await conexion.query(
    `SELECT a.ip, DATE_FORMAT(a.fecha,'%Y-%m-%d %H:%i:00') AS fecha, a.wired AS wireless, b.tag AS name, b.tipo, a.config
    FROM rajant_data a INNER JOIN inventario b ON a.ip = b.ip 
    WHERE a.fecha >= NOW() - INTERVAL 1 MINUTE
    ORDER BY a.fecha DESC, a.ip DESC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("kpiCostWired", JSON.stringify(result));
    }
  );
}

async function getCostWirelesspeers() {
  await conexion.query(
    `SELECT a.ip, DATE_FORMAT(a.fecha,'%Y-%m-%d %H:%i:00') AS fecha, a.wireless, b.tag AS name, b.tipo, a.config
    FROM rajant_data a INNER JOIN inventario b ON a.ip = b.ip 
    WHERE a.fecha >= NOW() - INTERVAL 1 MINUTE
    ORDER BY a.fecha DESC, a.ip DESC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("kpiCostWireless", JSON.stringify(result));
    }
  );
}

async function getVirMacServer(ip) {
  conexion.query(
    `SELECT DATE_FORMAT(a.fecha, '%Y-%m-%d %H:%i:00') AS fecha, a.ip, mv, CPUActual, CPUFisico, MemoriaActual, MemoriaFisico, DiscoActual, DiscoFisico
    FROM servidor_data a
    WHERE a.ip = '${ip}' AND a.fecha >= NOW() - INTERVAL 15 MINUTE - INTERVAL 2 HOUR;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("infoVirMac-" + ip, JSON.stringify(result));
    }
  );
}

async function getAllOperability() {
  conexion.query(
    `SELECT DATE_FORMAT(a.fecha, '%Y-%m-%d %H:%i:00') AS fecha, c.rol AS subtipo,
    SUM(CASE WHEN a.latencia >= 0 AND a.latencia < 100  THEN 1 ELSE 0 END) AS ok, 
    SUM(CASE WHEN a.latencia >= 100 AND a.latencia < 200 THEN 1 ELSE 0 END) AS alert, 
    SUM(CASE WHEN a.latencia >= 200 THEN 1 ELSE 0 END) AS alarm, 
    SUM(CASE WHEN a.latencia = -1 THEN 1 ELSE 0 END) AS down 
    FROM latencia a INNER JOIN inventario c ON a.ip = c.ip 
    WHERE a.fecha > NOW() - INTERVAL 3 DAY
    GROUP BY 1,2
    ORDER BY a.fecha DESC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("allOperability", JSON.stringify(result));
    }
  );
}

async function getAllOperabilityLastDay() {
  conexion.query(
    `SELECT a.ip, 
    SUM(CASE WHEN a.latencia >= 0 AND a.latencia < 100  THEN 1 ELSE 0 END) AS ok, 
    SUM(CASE WHEN a.latencia >= 100 AND a.latencia < 200 THEN 1 ELSE 0 END) AS alert, 
    SUM(CASE WHEN a.latencia >= 200 THEN 1 ELSE 0 END) AS alarm, 
    SUM(CASE WHEN a.latencia = -1 THEN 1 ELSE 0 END) AS down 
    FROM latencia a INNER JOIN inventario c ON a.ip = c.ip 
    WHERE (a.fecha >= NOW() - INTERVAL 12 HOUR) 
    GROUP BY 1 
    ORDER BY a.fecha DESC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("allOperabilityLastDay", JSON.stringify(result));
    }
  );
}

async function getAllIPS() {
  await conexion.query(
    `SELECT DISTINCT ip FROM rajant_data;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("allIPInstamesh", JSON.stringify(result));
    }
  );
}

async function getAllHaulTrucksDrive() {
  await conexion.query(
    `SELECT DISTINCT a.ip, b.tag AS name 
    FROM rajant_data a INNER JOIN inventario b ON a.ip = b.ip 
    WHERE b.tipo = 'Haultruck' AND fecha >= NOW() - INTERVAL 12 HOUR - INTERVAL 2 HOUR 
    ORDER BY b.tag ASC;`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("getAllHaulTrucksDrive", JSON.stringify(result));
    }
  );
}

async function getLastConectionHaultruck() {
  await conexion.query(
    `SELECT b.tag AS name, a.ip, DATE_FORMAT(a.fecha, '%Y-%m-%d %H:%i:00') AS conection
    FROM latencia a INNER JOIN inventario b ON a.ip = b.ip 
    WHERE b.tipo = 'Haultruck' AND a.fecha >= NOW() - INTERVAL 1 DAY - INTERVAL 2 HOUR 
    GROUP BY 1,2,3
    ORDER BY 1 ASC, 3 ASC`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set("getLastConectionHaultruck", JSON.stringify(result));
    }
  );
}

async function getCountLastConectionHaultruck() {
  await conexion.query(
    `SELECT b.tag AS name, a.ip, 
    SUM(CASE WHEN a.latencia >= 500 OR a.latencia < 0 THEN 1 ELSE 0 END) AS down
    FROM latencia a INNER JOIN inventario b ON a.ip = b.ip 
    WHERE b.tipo = 'Haultruck' AND a.fecha >= NOW() - INTERVAL 1 DAY - INTERVAL 2 HOUR 
    GROUP BY 1,2 
    ORDER BY 1 ASC`,
    async (error, result) => {
      if (error) return console.log(error);
      await client.set(
        "getCountLastConectionHaultruck",
        JSON.stringify(result)
      );
    }
  );
}

// GESTOR

async function getAllDataGestor() {
  let items = [];
  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: "newScripts",
    args: ["192.168.2.60"],
  };

  await PythonShell.run("LTE_get_config.py", options).then((messages) => {
    items = messages;
  });

  await client.set("AllDataGestor", JSON.stringify(items));
}

async function getAllDataIPS2() {
  let items = [];
  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: "newScripts",
    args: ["192.168.2.60"],
  };
  await PythonShell.run("LTE_get_config.py", options).then((messages) => {
    items = messages;
  });

  await client.set("allDataIPS2", JSON.stringify(items));
  await client.expire("allDataIPS2", 5000);
}

module.exports = {
  preChargeDataKPI,
  getAllLatLngInfo,
  getAllLatLngRAJANT,
  getAllLatLngPMPSM,
  // getMapCoberturaLatLng,
  // matchLatencyAndGPS,
  getAllTopologyData,
  getClientStatusData,
  getAllSNRData,
  getAllWirelessData,
  getAllWiredData,
  getAllTempData,
  getAllCostJRData,
  getDataBaseStatus,
  getAllCostData,
  getCostWiredpeers,
  getCostWirelesspeers,
  getVirMacServer,
  getAllPredictRXLVLData,
  getAllOperability,
  getAllOperabilityLastDay,
  getAllIPS,
  getKPIDashboard,
  getAllHaulTrucksDrive,
  getLastConectionHaultruck,
  getCountLastConectionHaultruck,
  getAllRajantDataLastMinute,
  getAllDataGestor,
  getAllDataIPS2,
};
