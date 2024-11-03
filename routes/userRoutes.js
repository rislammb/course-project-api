const router = require("express").Router();
const {
  getUserById,
  getSalesforceAccount,
} = require("../controllers/userController");

router.get("/salesforce", getSalesforceAccount);
router.get("/:userId", getUserById);

module.exports = router;
