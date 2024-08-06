require("dotenv").config({})
const connectDB = require("./config/dbConfig")
require("./config/logger")
const express = require("express");
const cors = require("cors");
const router = require("./routes/apiRoutes");
const app = express();

const PORT = process.env.PORT || 5000;



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

app.use("/api/v1", router);
// Listen port
app.listen(PORT, async function (port) {
    await connectDB()
    console.log("server listening on port " + PORT)
})

