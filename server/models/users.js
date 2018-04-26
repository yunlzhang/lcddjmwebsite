let User = require('../lib/mongoose').User;

module.exports = {
  // 注册一个用户
  create: function create(user) {
    let newUser = new User(user);
    return newUser.save();
  },

  // 通过用户名获取用户信息
  getUserByName: function getUserByName(name) {
    return User
      .findOne({ name: name });
  }
};
