// const data = require("../../data");
const data = require("../../data_sql3/data_sql");

const listUser = async (req, res) => {
  res.writeHead(200);
  const users = await data.getUsers();
  res.end(JSON.stringify(users));
};

module.exports = listUser;
