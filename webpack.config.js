const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  optimization: {
    minimize: true,
  },
  target: "web",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "ColorArrayAnimation",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
  // devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.js$/, loader: "source-map-loader" },
    ],
  },
};
