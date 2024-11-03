const { User } = require("../models");

exports.fetchUserById = async (id) => {
  return User.findOne({ where: { id }, attributes: ["id", "email", "role"] });
};
