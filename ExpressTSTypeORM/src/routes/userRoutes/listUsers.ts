import { Request, Response } from "express";

import { getUsers as DBGetUsers } from "../../data_sql3/dataSql";

export const listUsers = async (req: Request, res: Response) => {
  const users = await DBGetUsers();
  res.status(200).send(JSON.stringify(users));
};