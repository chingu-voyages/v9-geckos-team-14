const mongoose = require("mongoose");
const db = require("../config/keys").mongoURItest;

// Executed before the test run
before(done => {
  mongoose
    .connect(db, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
      done();
    })
    .catch(err => console.error(err));
});

// Excuted after every tests finished
after(done => {
  mongoose.connection.db
    .dropDatabase()
    .then(() => {
      mongoose.connection.close();
      done();
    })
    .catch(err => {
      console.error(err);
      mongoose.connection.close();
    });
});
