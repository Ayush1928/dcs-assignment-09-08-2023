const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const authRoute = require("./Routes/auth");
const cors = require("cors");
dotenv.config();
mongoose
  .connect("process.env.MONGODB_URL")
  .then(() => {
    console.log("Database Connected Successfully.");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(
  cors({
    origin: "process.env.CORS_ORIGIN",
  })
);

app.use(express.json());
app.use("/api/auth", authRoute);
app.listen(port, () => {
  console.log(`Backend Server is running on port : ${port}`);
});
