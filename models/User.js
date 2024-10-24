module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Template, { foreignKey: "ownerId" });
    User.hasMany(models.Form, { foreignKey: "userId" });
    User.hasMany(models.Comment, { foreignKey: "userId" });
  };

  return User;
};
