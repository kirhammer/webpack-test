const path = require('path');
const HtmllWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: './src/index.js', //Entry point of app
    output: {
        path: path.resolve(__dirname, 'dist'), //Location of output files
        filename: '[name].js', //Name of output file
        assetModuleFilename: 'assets/images/[hash].[ext][query]'
    },
    mode: 'development',
    resolve: {
        extensions: ['.js'], // What files should be proccessed
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
        rules: [ //Applies rlues?
            {
                test: /\.m?js$/, // Applies babel to .mjs or .js files
                exclude: /node_modules/, // Excludes files in node_moduels
                use: {
                    loader: 'babel-loader' // Specifies which plugin to use
                    // babel transpiles js to js code that is compatible with all browsers
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false
                    }
                },

            }
        ]
    },
    plugins: [
        new HtmllWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name]/[contenthash].css'
        }),
        new CopyWebpackPlugin({ //Moves specified files to a certain location
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv()
    ]
}