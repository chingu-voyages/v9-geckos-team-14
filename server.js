const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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

app.use("/api/palletes", palletes);
app.use("/api/account", account);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
