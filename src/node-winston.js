import * as http from "http";

import * as winston from "winston";

const loggerLevelName = "npm_config_logger";
const loggerOffName = "npm_config_logger_off";

// extract argv to env
Object.values(process.argv).reduce(
  (accumulator, cval) => {
    if (cval.startsWith("--")) {
      //iflastflag boolean
      const envParam = cval.substring(2);
      process.env[envParam] = "true";
      accumulator.flag = cval;
    } else if (accumulator.flag.startsWith("--")) {
      //overrides boolean flag as value
      const envParam = accumulator.flag.substring(2);
      process.env[envParam] = cval;
      accumulator.flag = "";
    }
    return accumulator;
  },
  { flag: "" }
);

const loggerLevel = process.env[loggerLevelName] || "info";
const loggerOff = process.env[loggerOffName] || false;

console.log("Logger level:", loggerLevel, ", Logger off:", loggerOff);

const logger = winston.createLogger({
  level: loggerLevel,
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const server = http.createServer({}, (request, response) => {
  const body = JSON.stringify({ hello: "world" }) + "/n";
  if (loggerOff == false) {
    logger.debug("Response", body);
  }

  response.setHeader("Content-Type", "application/json");
  response.setHeader("Content-Length", Buffer.byteLength(body));
  response.end(body);
});

server.listen(8080, "0.0.0.0");

server.on("error", (err) => {
  console.log("exit");
  process.exit(1);
});
console.log("start node-winston http");
