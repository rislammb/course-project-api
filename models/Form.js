module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define("Form", {
    answers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  Form.associate = (models) => {
    Form.belongsTo(models.Template, { foreignKey: "templateId" });
    Form.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Form;
};
