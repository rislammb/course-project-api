const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

// Form routes
router.post("/", formController.submitForm);
router.get("/template/:templateId", formController.getFormsByTemplate);
router.get("/:id", formController.getFormById);
router.put("/:id", formController.updateForm);
router.delete("/:id", formController.deleteForm);

module.exports = router;
