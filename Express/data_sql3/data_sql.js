const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the database");
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`);

module.exports = {
  getUsers: async () => {
    try {
      const users = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM users", (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
      console.log(users);
      return users;
    } catch (err) {
      return [];
    }
  },
  addUser: async (user) => {
    try {
      const lastId = await new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO users (name, age) VALUES (?, ?)",
          [user.name, user.age],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.lastID);
            }
          }
        );
      });

      return { id: lastId, ...user };
    } catch (err) {
      return null;
    }
  },
  updateUser: async (id, user) => {
    try {
      const changes = await new Promise((resolve, reject) => {
        db.run(
          "UPDATE users SET name = ?, age = ? WHERE id = ?",
          [user.name, user.age, id],
          function (err) {
            resolve(this.changes);
          }
        );
      });
      return changes > 0;
    } catch (err) {
      return false;
    }
  },
  deleteUser: async (id) => {
    try {
      const changes = await new Promise((resolve, reject) => {
        db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
          resolve(this.changes);
        });
      });
      return changes > 0;
    } catch (err) {
      return false;
    }
  },
  getUserById: async (id) => {
    try {
      const user = await new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE id = ?", [id], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
      return user;
    } catch (err) {
      return null;
    }
  },
};
