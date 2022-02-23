const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    filenameHashing: false,
    configureWebpack: {
        devtool: 'source-map',
        optimization: {
            splitChunks: false
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',  //template file to embed the source
                inlineSource: '.(js|css)$' // embed all javascript and css inline
            }),
            new HtmlWebpackInlineSourcePlugin()
        ]
    },
    css: {
        extract: false,
    }
}