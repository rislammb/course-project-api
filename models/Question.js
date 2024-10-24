module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
    questionType: {
      type: DataTypes.ENUM(
        "single-line",
        "multiple-line",
        "integer",
        "checkbox"
      ),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    isVisible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  Question.associate = (models) => {
    Question.belongsTo(models.Template, { foreignKey: "templateId" });
  };

  return Question;
};
