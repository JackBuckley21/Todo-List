const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    main: "./client/client.js"
  },
  output: {
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./client/index.html",
      filename: "index.html",
    }),

  ],
  devServer: {
    port: 8080, // Defaults to 8080
    proxy: {
      '/api/*': {
        target: {
          host: "0.0.0.0",
          protocol: 'http:',
          port: 5000
        },
        pathRewrite: { '^/api/': '/' }
      }
    }
  }
};