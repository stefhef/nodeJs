// const data = require("../../data");
const data = require("../../data_sql3/data_sql");

const createUser = (req, res) => {
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
      const createdUser = await data.addUser(user);
      res.writeHead(201);
      res.end(JSON.stringify(createdUser));
    } else {
      res.writeHead(400);
      res.end(JSON.stringify({ message: "Name and age are reqired" }));
    }
  });
};

module.exports = createUser;
