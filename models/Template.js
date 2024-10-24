module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define("Template", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  Template.associate = (models) => {
    Template.belongsTo(models.User, { foreignKey: "ownerId" });
    Template.hasMany(models.Question, { foreignKey: "templateId" });
    Template.hasMany(models.Form, { foreignKey: "templateId" });
    Template.hasMany(models.Comment, { foreignKey: "templateId" });
  };
  return Template;
};
