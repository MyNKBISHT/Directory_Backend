const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const env = require("dotenv");
const cors = require("cors");
const app = express();

env.config();
// mongodb connection
const DB_NAME = process.env.DB_NAME;
const DB_PASS = process.env.DB_PASS;
const PORT = process.env.PORT;
mongoose
  .connect(
    `mongodb+srv://${DB_NAME}:${DB_PASS}@cluster.9iwi5.mongodb.net/directory?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Database Connected");
  });
const userRoute = require("../src/routes/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Handling CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

//Routes
app.use("/dir", userRoute);

app.listen(`${PORT}`, () => {
  console.log("Server is running on port 3000");
});
