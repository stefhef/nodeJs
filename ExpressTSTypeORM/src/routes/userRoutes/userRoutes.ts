
import { Router } from "express";
export const UserRouter = Router();

import { createUser } from "./createUser";
import { deleteUser } from "./deleteUser";
import { getUserById } from "./getUserById";
import { listUsers } from "./listUsers";
import { updateUser } from "./updateUser";

UserRouter.get("", listUsers);
UserRouter.post("", createUser);
UserRouter.get("/:id", getUserById);
UserRouter.put("/:id", updateUser);
UserRouter.delete("/:id", deleteUser);

