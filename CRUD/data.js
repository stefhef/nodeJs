let users = [];

let currentId = 1;

module.exports = {
  getUsers: () => users,
  addUser: (user) => {
    user.id = currentId++;
    users.push(user);
  },
  updateUser: (id, user) => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return null;
    }
    users[index] = { ...users[index], ...user };
    return users[index];
  },
  deleteUser: (id) => {
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      return true;
    }
    return false;
  },
  getUserById: (id) => users.find((u) => u.id === id),
};
