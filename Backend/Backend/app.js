const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const registerRoutes = require("./routes/register");
const exploreRoutes = require("./routes/explore");
const loginRoutes = require("./routes/login");
const talentDashboard = require("./routes/talentDashboard");
const uploads = require("./routes/uploads")
const cors = require("cors");
const multer  = require('multer');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});






app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan("tiny"));
app.use("/register",cors(), registerRoutes)
app.use("/login",cors(), loginRoutes)
app.use("/explore",cors(), exploreRoutes)
app.use("/talentDashboard",cors(), talentDashboard)
app.use("/uploads",cors(), uploads)


app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  
  if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.send({
        message: err.message,
        error: err
      });
    });
  }
  
  app.listen(305, function() {
    console.log("Server starting on port 305!");
  });
  