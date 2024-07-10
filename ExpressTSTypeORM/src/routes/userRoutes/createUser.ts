import { Request, Response } from "express";

import { addUser } from "../../data_sql3/dataSql" 

export const createUser = (req: Request, res: Response) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    const parseBody = new URLSearchParams(body);
    const name = parseBody.get("name");
    const age = parseBody.get("age");

    if (name && age) {
      const user = { name, age: parseInt(age) };
      const createdUser = await addUser(user);
      res.status(201).send(JSON.stringify(createdUser));
    } else {
      res
        .status(400)
        .send(JSON.stringify({ message: "Name and age are required" }));
    }
  });
};
