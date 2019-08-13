import express from "express";
import mustacheExpress from "mustache-express";
import { validate, generate } from "./configGenerator";
import bodyParser from "body-parser";

const app = express();

// Body parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine("cfg", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname);

//Entry route
app.get("/", function(req, res) {
  res.json({ msg: "Check Wiki for generating server config." });
});

//Post entry point
app.post("/", validate, generate);

//Listen on port 3000
app.listen(3000, function() {
  console.log("Listening on port 3000!");
});

module.exports = app;
