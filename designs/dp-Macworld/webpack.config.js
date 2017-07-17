var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ZipPlugin = require('zip-webpack-plugin');
module.exports = {
    entry: './javascripts/script.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'javascripts/script.js'
    },
    resolve:{
        extensions: ['js','json','scss','css']
    },
    module: {

        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { 
                  presets: [ 
                    [ 'es2015', { modules: false } ] 
                  ] 
                }
            },
            {   test: /\.scss$/, 
                use: ExtractTextPlugin.extract({ 
                    fallback: 'style-loader', use: ['css-loader' ,'sass-loader']
            }) },

        ]
    },
    plugins:[
        // cleans build directory before every build
        new CleanWebpackPlugin(['dist/*.*']),

        new CopyWebpackPlugin([
            { from: 'fonts/*.ttf', to: './' },
            { from: 'stylesheets/*.css', to: './' },
            { from: 'layouts', to: 'layouts' },
            { from: {
                    glob:'images/**/*',
                    dot:false
                }, to: './' 
            },
            { from: 'config.xml', to: 'config.xml' }]),
            
        new ZipPlugin({
            filename: 'deploy.zip',
            pathPrefix: './'
        })
    ]
}