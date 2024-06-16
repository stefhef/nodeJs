// const data = require('../../data')

const data = require("../../data_sql3/data_sql");

const updateUser = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    const id = parseInt(req.url.split("/")[2]);
    const parseBody = new URLSearchParams(body);
    const name = parseBody.get("name");
    const age = parseBody.get("age");

    if (name && age) {
      const user = { name, age: parseInt(age) };
      const updatedUser = await data.updateUser(id, user);
      res.status(201).send(JSON.stringify(updatedUser));
    } else {
      res
        .status(400)
        .send(JSON.stringify({ message: "Name and age are required" }));
    }
  });
};

module.exports = updateUser;
