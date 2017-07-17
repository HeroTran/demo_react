const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ZipPlugin = require('zip-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    context: __dirname,
    entry:  './app.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './build')
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map", //for faster builds use: "eval", "eval-source-map"

    resolve: {
        extensions: [".js", ".json", ".css"]
    },


    module: {
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            // sass/css loader
            {	test:/\.(scss$|css$)/, 
            	use: ExtractTextPlugin.extract({
            		fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
            	})
            },

            //url-loader for image assets (base64 encoded and inlined in the css bundle)
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                  limit: 10000
                }
            },
            //file-loader for font assets
            {
                test: /\.ttf$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },

        ]
    },

    plugins: [
        // cleans build directory before every build
        new CleanWebpackPlugin(['build/*.*']),

    	new ExtractTextPlugin(
            {
                filename: "bundle.css",
                publicPath: "./prod/css"
            }
        ),
        new CopyWebpackPlugin([
           // {from: './layouts/*.html'},
            {from: './layouts/*.twig'},
            {from: './config.xml'},
            {from: './default-thumbnail.jpg'}
        ]),
        new ZipPlugin(
            {
                filename: 'Multiplecolumn_designPack_051907_1400.zip'
            }
        ) 
    ]
};
