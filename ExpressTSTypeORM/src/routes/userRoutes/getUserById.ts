import { Request, Response } from "express";

import { getUserById as DBGetUserById } from "../../data_sql3/dataSql";

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.url.split("/")[2]);
  const user = await DBGetUserById(id);
  if (!user) {
    res.status(404).send(JSON.stringify({ message: "User not found" }));
  } else {
    res.status(200).send(JSON.stringify(user));
  }
};
