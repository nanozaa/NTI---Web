const app = require("../index");
const dbConnect = require("../config/db-connect");

let databaseConnection;

module.exports = async (req, res) => {
  databaseConnection ??= dbConnect();
  await databaseConnection;
  return app(req, res);
};