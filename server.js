const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorHandler = require("./middleWare/errorMiddleWare");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes middleware 
app.use("/api/users", require("./routes/userRoute"));


// --------------------------deployment on heroku------------------------------

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// Error handler middleware
app.use(errorHandler)


// Routes
app.get("/", (req, res) => {
    res.send("Home page");
})

const PORT = process.env.PORT || 4040


// Connect to the server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server started on PORT: ", PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    })