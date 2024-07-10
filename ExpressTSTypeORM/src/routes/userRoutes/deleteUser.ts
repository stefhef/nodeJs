import { Request, Response } from "express";

import { deleteUser as dbDeleteUser }  from "../../data_sql3/dataSql";

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.url.split("/")[2]);
  const flag = await dbDeleteUser(id);
  if (!flag) {
    res.status(404).send(JSON.stringify({ message: "User not found" }));
  } else {
    res.status(200).send(JSON.stringify({ message: "User deleted" }));
  }
};
