const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    
    output:{
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },



    plugins: [new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"  
    })]
}