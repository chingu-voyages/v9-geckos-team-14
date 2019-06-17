const request = require("supertest");
const assert = require("chai").assert;
const mongoose = require("mongoose");
const express = require("express");
const palletes = require("../../routes/api/palletes");
const Pallete = require("../../models/Pallete");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/palletes", palletes);

describe("API Palletes", function() {
  // eslint-disable-next-line no-invalid-this
  this.timeout(10000);

  before("Prepare DB", function() {
    const db = require("../../config/keys").mongoURItest;
    mongoose
      .connect(db, { useNewUrlParser: true, useFindAndModify: false })
      .then(() => {
        const newPallete = new Pallete({
          name: "Gruvbox",
          author: "morhetz",
          colors: [{ hex: "#282828", order: 0 }]
        });
        newPallete.save();
      })
      .catch(err => console.error(err));
  });

  after(function() {
    mongoose.connection.db
      .dropDatabase()
      .then(() => {
        mongoose.connection.close();
      })
      .catch(err => {
        console.error(err);
        mongoose.connection.close();
      });
  });

  describe("GET /api/palletes/all", function() {
    it("Should respond with status 200", function() {
      return request(app)
        .get("/api/palletes/all")
        .expect(200);
    });

    it("Should respond with json", function() {
      return request(app)
        .get("/api/palletes/all")
        .expect("Content-Type", /json/);
    });

    it("Should respond with array of pallete objects", function() {
      return request(app)
        .get("/api/palletes/all")
        .then(res => {
          assert.isArray(res.body);
        });
    });

    it("Response should not be empty", function() {
      return request(app)
        .get("/api/palletes/all")
        .then(res => {
          assert.isObject(res.body[0]);
        });
    });
  });

  describe("POST /api/palletes/new", function() {
    it("Should accept application/json", function() {
      const payload = {
        name: "PalleteName",
        author: "author",
        colors: [{ hex: "#ffffff", order: 0 }]
      };
      return request(app)
        .post("/api/palletes/new")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect("Content-Type", /json/);
    });

    it("Should create new pallete", function() {
      const payload = {
        name: "PalleteName",
        author: "author",
        colors: [{ hex: "#ffffff", order: 0 }]
      };
      return request(app)
        .post("/api/palletes/new")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .then(res => {
          assert.isTrue(res.body.success);
          Pallete.findById(res.body.pallete.id, (err, doc) => {
            assert.equal(payload.name, doc.name);
          });
        })
        .catch(err => console.error(err));
    });

    it("Should respond with single object", function() {
      const payload = {
        name: "PalleteName",
        author: "author",
        colors: [{ hex: "#ffffff", order: 0 }]
      };
      return request(app)
        .post("/api/palletes/new")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .then(res => {
          assert.isObject(res.body);
        })
        .catch(err => console.error(err));
    });

    it("Should respond with json", function() {
      return request(app)
        .post("/api/palletes/new")
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect("Content-Type", /json/);
    });

    it.skip("Should respond with status 201 if pallete created", function() {
      const payload = {
        name: "PalleteName",
        author: "author",
        colors: [{ hex: "#ffffff", order: 0 }]
      };
      return request(app)
        .post("/api/palletes/new")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(201);
    });

    it.skip("Should respond with status 400 if no body", function() {
      return request(app)
        .post("/api/palletes/new")
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it.skip("Should respond with status 400 if no name", function() {
      const payload = {
        name: "",
        author: "author",
        colors: [{ hex: "#ffffff", order: 0 }]
      };
      return request(app)
        .post("/api/palletes/new")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it.skip("Should respond with status 400 if no colors", function() {
      const payload = {
        name: "",
        author: "author",
        colors: []
      };
      return request(app)
        .post("/api/palletes/new")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it("Should respond with pallete id", function() {
      const payload = {
        name: "PalleteName",
        author: "author",
        colors: [{ hex: "#ffffff", order: 0 }]
      };
      return request(app)
        .post("/api/palletes/new")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .then(res => {
          assert.isString(res.body.pallete.id);
        })
        .catch(err => console.error(err));
    });
  });
});
