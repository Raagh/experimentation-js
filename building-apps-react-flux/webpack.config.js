const path = require("path");
const config = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2017"],
          plugins: ['transform-class-properties']
        }
      }
    ]
  }
};

module.exports = config;