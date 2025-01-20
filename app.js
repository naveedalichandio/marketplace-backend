var express = require("express");
var app = express(); // Init Express APP
var server = require("http").Server(app);
const db = require("./scr/models/index");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");

db.sequelize
  .sync({ alter: true })

  .then(() => {
    console.log("Database synchronized!");

    app.use(express.static(path.join(__dirname, "/public")));
    app.use(function (err, req, res, next) {
      if (err.name === "UnauthorizedError") {
        res.status(401);
        res.json({ message: err.name + ": " + err.message });
      }
    });
    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(cors());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    var route = require("./scr/routes");
    app.use(route);

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../../public", "index.html"));
    });

    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.send({
        error: { code: err.code, msg: err.message },
      });
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error.message);
  });
const PORT = 8080;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on the http://${HOST}:${PORT}`);
});
