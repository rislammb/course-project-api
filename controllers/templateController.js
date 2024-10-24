const Template = require("../models/Template");
const Question = require("../models/Question");
const User = require("../models/User");

// Create a new template
exports.createTemplate = async (req, res) => {
  const { title, description } = req.body;
  try {
    const template = await Template.create({
      title,
      description,
      ownerId: req.userId, // Set the owner as the logged-in user
    });
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: "Error creating template." });
  }
};

// Get all templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll({
      include: [{ model: User, attributes: ["email"] }],
    });
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving templates." });
  }
};

// Get a single template by ID
exports.getTemplateById = async (req, res) => {
  const { id } = req.params;
  try {
    const template = await Template.findByPk(id, {
      include: [{ model: User, attributes: ["email"] }, Question],
    });
    if (!template)
      return res.status(404).json({ message: "Template not found." });
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving template." });
  }
};

// Update a template
exports.updateTemplate = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const template = await Template.findByPk(id);
    if (!template)
      return res.status(404).json({ message: "Template not found." });

    if (template.ownerId !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this template." });
    }

    template.title = title || template.title;
    template.description = description || template.description;
    await template.save();
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: "Error updating template." });
  }
};

// Delete a template
exports.deleteTemplate = async (req, res) => {
  const { id } = req.params;
  try {
    const template = await Template.findByPk(id);
    if (!template)
      return res.status(404).json({ message: "Template not found." });

    if (template.ownerId !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this template." });
    }

    await template.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting template." });
  }
};
