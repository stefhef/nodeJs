import express, { Application } from "express";

import { UserRouter } from "./routes/userRoutes/userRoutes";

const app: Application = express();

const SERVER_PORT = 3000;

app.use("/users", UserRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Сервер запущен на порту ${SERVER_PORT}`);
});
