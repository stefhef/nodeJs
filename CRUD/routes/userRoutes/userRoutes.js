const url = require("url");

const createUser = require("./createUser");
const deleteUser = require("./deleteUser");
const getUserById = require("./getUserById");
const listUsers = require("./listUsers");
const updateUser = require("./updateUser");

const userRoutes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const { pathname } = parsedUrl;

  if (pathname === "/users" && method === "GET") {
    listUsers(req, res);
  } else if (pathname === "/users" && method === "POST") {
    createUser(req, res);
  } else if (pathname.startsWith("/users/") && method === "GET") {
    getUserById(req, res);
  } else if (pathname.startsWith("/users/") && method === "PUT") {
    updateUser(req, res);
  } else if (pathname.startsWith("/users/") && method === "DELETE") {
    deleteUser(req, res);
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Routes for user not found" }));
  }
};

module.exports = userRoutes;
