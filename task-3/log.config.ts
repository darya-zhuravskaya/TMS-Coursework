import log4js from "log4js";

log4js.configure({
  appenders: { log: { type: "file", filename: "logs/tests.log" } },
  categories: { default: { appenders: ["log"], level: "debug" } },
});

const logger = log4js.getLogger();

export { logger };
