const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./Config/connectDB")
app.use(express.json())
const userRoute = require("./Routes/userRoute")
app.use("/users", userRoute)
const reportRoute = require("./Routes/reportRoute")
app.use("/reports", reportRoute)
const parkingRoute = require("./Routes/parkingRoute");
app.use("/parking", parkingRoute);
const weatherRoute = require("./Routes/weather");
app.use("/weather", weatherRoute);


connectDB()

const port = process.env.PORT;

app.listen(port, (err) =>
  err ? console.log(err) : console.log("server is running on port 5000")
);
