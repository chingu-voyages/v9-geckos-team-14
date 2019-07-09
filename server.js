const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const palletes = require("./routes/api/palletes");
const account = require("./routes/api/account");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("DB connected"))
  .catch(error => console.error(error));

// API
app.use("/api/palletes", palletes);
app.use("/api/account", account);

// Serve production static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
