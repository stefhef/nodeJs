const express = require("express");
const UserRouter = express.Router();

const createUser = require("./createUser");
const deleteUser = require("./deleteUser");
const getUserById = require("./getUserById");
const listUsers = require("./listUsers");
const updateUser = require("./updateUser");

UserRouter.get("", listUsers);
UserRouter.post("", createUser);
UserRouter.get("/:id", getUserById);
UserRouter.put("/:id", updateUser);
UserRouter.delete("/:id", deleteUser);

module.exports = UserRouter;
