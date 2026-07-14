import app from "./app.js";
import { config } from "./config/env.js";

const server = app.listen(config.port, () => {
  console.log(
    `Servidor ejecutándose en el puerto ${config.port} en modo ${config.env}.`,
  );
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLE REJECTION! Cerrando el servidor de forma segura...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
