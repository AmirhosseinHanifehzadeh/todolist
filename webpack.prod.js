const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const {cleanWebpackPlugin} = require("clean-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const terserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    mode: "production",
    
    output:{
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },

    plugins: [new miniCssExtractPlugin({filename: "[name].[contenthash].css"})],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [miniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },

    optimization: {
        minimizer: [
        new CssMinimizerPlugin(),
        new terserPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        })
        ]
         
    }
})