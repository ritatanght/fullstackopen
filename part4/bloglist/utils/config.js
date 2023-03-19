require("dotenv").config();

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const PORT = 3003;
const SECRET = process.env.SECRET;

module.exports = { mongoUrl, PORT, SECRET };
