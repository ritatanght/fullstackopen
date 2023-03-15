const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const config = require("./utils/config");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(config.mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

module.exports = app;