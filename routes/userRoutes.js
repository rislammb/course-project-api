const router = require("express").Router();
const { getSalesforceAccount } = require("../controllers/userController");

router.get("/salesforce", getSalesforceAccount);

module.exports = router;
