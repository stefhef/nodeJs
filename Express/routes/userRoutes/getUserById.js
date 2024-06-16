// const data = require("../../data");
const data = require("../../data_sql3/data_sql");

const getUserById = async (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  const user = await data.getUserById(id);
  if (!user) {
    res.status(404).send(JSON.stringify({ message: "User not found" }));
  } else {
    res.status(200).send(JSON.stringify(user));
  }
};

module.exports = getUserById;
