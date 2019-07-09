const request = require("supertest");
const assert = require("chai").assert;
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

    it.skip("Response should not be empty", function() {
      return request(app)
        .get("/api/palletes/all")
        .then(res => {
          const { body } = res;
          assert.isObject(body[0]);
        });
    });
  });

  describe("GET /api/palletes/getById", function() {
    it("Should respond with status 400 if no ID", function() {
      return request(app)
        .get("/api/palletes/getById")
        .expect(400);
    });

    it("Should respond with json", function() {
      pallete = new Pallete();
      pallete.name = "New theme";
      pallete.author = "noname";
      pallete.colors = [
        { hex: "#ffffff", order: 1 },
        { hex: "#000000", order: 2 }
      ];
      pallete.save();

      return request(app)
        .get(`/api/palletes/getById?id=${pallete._id}`)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect("Content-Type", /json/);
    });

    it("Should respond with status 200 if pallete found", function() {
      pallete = new Pallete();
      pallete.name = "New theme 2";
      pallete.author = "non4me";
      pallete.colors = [
        { hex: "#ffffff", order: 1 },
        { hex: "#000000", order: 2 }
      ];
      pallete.save();

      return request(app)
        .get(`/api/palletes/getById?id=${pallete._id}`)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(200);
    });

    it("Should respond with pallete object if found", function() {
      pallete = new Pallete();
      pallete.name = "New theme 3";
      pallete.author = "non4m3";
      pallete.colors = [
        { hex: "#ffffff", order: 1 },
        { hex: "#000000", order: 2 }
      ];
      pallete.save();

      return request(app)
        .get(`/api/palletes/getById?id=${pallete._id}`)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(200)
        .then(res => {
          assert.isObject(res.body.pallete);
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

    it(
      "Should respond with status 400 if Content-Type is not application/json"
    );

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

  describe("POST /api/palletes/delete", function() {
    it("Pallete delete test case");
  });
});
