const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // Main entry point of the JS
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'simple-library.js', // Output JavaScript file
    library: 'SimpleLibrary', // The global variable name when included in other projects
    libraryTarget: 'umd', // Ensures compatibility with various module systems (e.g., CommonJS, AMD, or as a global variable)
    globalObject: 'this', // Ensures it works in both Node.js and browser environments
  },
  module: {
    rules: [
      {
        test: /\.js$/, // For JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Enable modern JS features
          },
        },
      },
      {
        test: /\.scss$/, // For Sass/SCSS files
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles Sass to CSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'simple-library.css', // Output CSS file
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve content from the dist folder
    },
    compress: true,
    port: 9000,
  },
  mode: 'production', // Set to production to enable minification and optimization
};
