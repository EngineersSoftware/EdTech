import app from "./app.js";
import { config } from "./config/env.js";
import { logger } from "./config/logger.js";

const server = app.listen(config.port, () => {
    logger.info(`Servidor ejecutándose en el puerto ${config.port} en modo ${config.env}.`);
});

process.on("unhandledRejection", (err) => {
  logger.error('UNHANDLE REJECTION! Cerrando el servidor de forma segura...');
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
