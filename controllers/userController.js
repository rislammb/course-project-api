const { fetchSalesforceAccount } = require("../services/salesforce");

exports.getSalesforceAccount = async (_req, res) => {
  try {
    const { records } = await fetchSalesforceAccount();
    res.status(200).json({ records });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
