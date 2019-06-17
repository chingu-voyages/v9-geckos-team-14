// const request = require("supertest");
// const assert = require("chai").assert;
// const mongoose = require("mongoose");
// const express = require("express");
// const palletes = require("../routes/api/palletes");

// const app = express();

// app.use("/api/palletes", palletes);

// describe("API Palletes", function() {
//   // eslint-disable-next-line no-invalid-this
//   this.timeout(5000);

//   before("Connecting to DB", function() {
//     const db = require("../config/keys").mongoURI;
//     mongoose
//       .connect(db, { useNewUrlParser: true, useFindAndModify: false })
//       .catch(err => console.error(err));
//   });

//   after(function() {
//     mongoose.connection.close();
//   });

//   it("responds with json", function() {
//     return request(app)
//       .get("/api/palletes/all")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .then(response => {
//         assert.equal(response.body.email, undefined);
//       });
//   });
// });
