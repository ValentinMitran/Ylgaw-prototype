const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

//Import Routes
const authRoute = require("./routes/auth");
const timeMachineRoute = require("./routes/timeMachine");
const todoRoute = require("./routes/todo");
const walletRoute = require("./routes/wallet");
const profileRoute = require("./routes/profile");
const storeRoute = require("./routes/store");
const socialRoute = require('./routes/social');

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("DB up n running")
);

//Middleware
app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/timeMachine", timeMachineRoute);
app.use("/api/todo", todoRoute);
app.use("/api/wallet", walletRoute);
app.use("/api/profile", profileRoute);
app.use("/api/store", storeRoute);
app.use("/api/social",socialRoute);

app.listen(process.env.PORT || 3001, () => console.log("Express running"));
