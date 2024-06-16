const UserRouter = require("./routes/userRoutes/userRoutes.js");

const express = require("express");
const app = express();

const SERVER_PORT = 3000;

app.use("/users", UserRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Сервер запущен на порту ${SERVER_PORT}`);
});
