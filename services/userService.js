const { User } = require("../models");

exports.fetchUserById = async (id) => {
  try {
    return User.findByPk(id, {
      attributes: ["id", "email", "role"],
    });
  } catch (error) {
    console.log("Error from salesforce login => ", error);
  }
};
