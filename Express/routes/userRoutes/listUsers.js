// const data = require("../../data");
const data = require("../../data_sql3/data_sql");

const listUser = async (req, res) => {
  const users = await data.getUsers();
  res.status(200).send(JSON.stringify(users));
};

module.exports = listUser;
