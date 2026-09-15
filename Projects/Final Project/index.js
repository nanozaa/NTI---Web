require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const path = require("path");
const dbConnect = require("./config/db-connect");
const menuRouter = require("./routes/menu-routes");
const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes");
const orderRouter = require("./routes/order-routes");
const reservationRouter = require("./routes/reservation-routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reservations", reservationRouter);

const startServer = async () => {
  await dbConnect();

  app.listen(port, () => {
    console.log(`Restaurant API listening on port ${port}`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = app;

//Email: admin@saffrontable.local
//Password: Admin12345
