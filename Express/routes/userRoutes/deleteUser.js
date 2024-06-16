// const data = require("../../data");
const data = require("../../data_sql3/data_sql");

const deleteUser = async (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  const flag = await data.deleteUser(id);
  if (!flag) {
    res.status(404).send(JSON.stringify({ message: "User not found" }));
  } else {
    res.status(200).send(JSON.stringify({ message: "User deleted" }));
  }
};

module.exports = deleteUser;
