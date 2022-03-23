const { resolve } = require("path");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist")
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /(node_module)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              [
                "@babel/plugin-proposal-class-properties",
                {
                  loose: true
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,

        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.(sass|scss)$/,

        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
