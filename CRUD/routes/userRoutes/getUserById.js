const url = require("url");

// const data = require("../../data");
const data = require("../../data_sql3/data_sql");

const getUserById = async (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  const user = await data.getUserById(id);
  if (!user) {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "User not found" }));
  } else {
    res.writeHead(200);
    res.end(JSON.stringify(user));
  }
};

module.exports = getUserById;
