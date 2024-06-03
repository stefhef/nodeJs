const http = require("http");

const requestHandler = require("./routes/router");

const SERVER_IP = "127.0.0.1";
const SERVER_PORT = 3000;

// Создание сервера
const server = http.createServer(requestHandler);

// Запуск сервера
server.listen(SERVER_PORT, SERVER_IP, () => {
  console.log(`Сервер запущен по адресу ${SERVER_IP} на порту ${SERVER_PORT}`);
});
