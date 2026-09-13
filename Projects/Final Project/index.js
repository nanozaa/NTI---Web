require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const dbConnect = require("./config/db-connect");
const menuRouter = require("./routes/menu-routes");
const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes");
const orderRouter = require("./routes/order-routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);

const startServer = async () => {
  await dbConnect();

  app.listen(port, () => {
    console.log(`Restaurant API listening on port ${port}`);
  });
};

startServer();
