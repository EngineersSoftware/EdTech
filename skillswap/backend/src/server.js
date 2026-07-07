import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT} en modo desarrollo`);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLE REJECTION! Cerrando el servidor de forma segura...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});