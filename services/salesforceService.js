const jsforce = require("jsforce");

exports.fetchSalesforceAccount = async () => {
  try {
    const conn = new jsforce.Connection();
    await conn.login(
      process.env.SF_USERNAME,
      process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN
    );
    return conn.query("SELECT Id, Name FROM Account");
  } catch (error) {
    console.log("Error from salesforce login => ", error);
  }
};
