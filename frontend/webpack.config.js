const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [
    new Dotenv({
      path: "./.env",
      prefix: "process.env.",
    }),
  ],
};
