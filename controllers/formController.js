const Form = require("../models/Form");
const Template = require("../models/Template");
const User = require("../models/User");

// Submit a new form
exports.submitForm = async (req, res) => {
  const { templateId, answers } = req.body;

  try {
    const template = await Template.findByPk(templateId);
    if (!template)
      return res.status(404).json({ message: "Template not found." });

    const form = await Form.create({
      templateId,
      answers,
      userId: req.userId, // Set the user who submitted the form
    });

    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error submitting form." });
  }
};

// Get all forms based on a template
exports.getFormsByTemplate = async (req, res) => {
  const { templateId } = req.params;

  try {
    const forms = await Form.findAll({
      where: { templateId },
      include: [{ model: User, attributes: ["email"] }],
    });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving forms." });
  }
};

// Get a specific form by ID
exports.getFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findByPk(id, {
      include: [{ model: User, attributes: ["email"] }],
    });
    if (!form) return res.status(404).json({ message: "Form not found." });
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving form." });
  }
};

// Update a form (if needed)
exports.updateForm = async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;

  try {
    const form = await Form.findByPk(id);
    if (!form) return res.status(404).json({ message: "Form not found." });

    if (form.userId !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this form." });
    }

    form.answers = answers || form.answers;
    await form.save();
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error updating form." });
  }
};

// Delete a form
exports.deleteForm = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findByPk(id);
    if (!form) return res.status(404).json({ message: "Form not found." });

    if (form.userId !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this form." });
    }

    await form.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting form." });
  }
};
