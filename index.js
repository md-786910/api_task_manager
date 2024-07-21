require("dotenv").config({})
const connectDB = require("./config/dbConfig")
require("./config/logger")
const express = require("express");
const router = require("./routes/apiRoutes");
const app = express();

const PORT = process.env.PORT || 5000;



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/v1", router);
// Listen port
app.listen(PORT, async function (port) {
    await connectDB()
    console.log("server listening on port " + PORT)
})

