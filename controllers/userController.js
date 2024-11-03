const { fetchSalesforceAccount } = require("../services/salesforceService");
const { fetchUserById } = require("../services/userService");

exports.getUserById = async (req, res) => {
  try {
    const user = await fetchUserById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error from getting salesforce." });
  }
};

exports.getSalesforceAccount = async (_req, res) => {
  try {
    const result = await fetchSalesforceAccount();
    res.status(200).json(result.records);
  } catch (error) {
    res.status(500).json({ message: "Error from getting salesforce." });
  }
};
