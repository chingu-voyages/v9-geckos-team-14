module.exports = {
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost/chingu-color-app",
  mongoURItest:
    process.env.MONGODB_URI_TEST || "mongodb://localhost/chingu-color-app-test"
};
